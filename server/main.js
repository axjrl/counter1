import { Meteor } from 'meteor/meteor';
import {Fields} from "../imports/api/fields";
import {History} from "../imports/api/history";



Meteor.methods({
    insertField (name, key, user, folder) {
        Fields.insert({name: name, key: key, count: 0, user: user, folder: folder, type:"field"})
    },
    increaseField (user, folder, key) {
        Fields.update({folder:folder, user: user, type: "field", key: key}, {$inc: {"count": 1}})
    },
    decreaseField (user, folder, key) {
        Fields.update({folder:folder, user: user, key: key}, {$inc: {"count": -1}})
    },
    resetField (user, folder, key) {
        Fields.update({folder:folder, user: user, key: key}, {$set: {"count": 0}})
    }
    ,
    deleteField (user, folder, key, id) {
        const field = Fields.find({user:user, type: "field", key: key, _id: id, folder:folder}).fetch()[0];
        const dateNow = new Date();

        History.insert({user: user, action: "remove", field: field, timestamp: dateNow});
        Fields.remove({user:user, type: "field", key: key, _id: id, folder:folder});
    },
    createFolder (name, user) {
        Fields.insert({name: name, user: user, type:"folder"})
    },
    registerUser (email, password) {
        Accounts.createUser({
            email: email,
            password: password
        });
        return "success";
    },

    deleteFolder (folder) {
        const folderInfo = Fields.find({type: "folder",_id: folder}).fetch()[0];
        const fieldsFromFolder = Fields.find({folder:folder}).fetch();
        const dateNow = new Date();

        fieldsFromFolder.map((field)=> {
            History.insert({user: Meteor.userId(), action: "remove", field: field, timestamp: dateNow});
        })
        History.insert({user: Meteor.userId(), action: "remove", field: folderInfo, timestamp: dateNow});

        Fields.remove({_id:folder,})
        Fields.remove({folder:folder,})
    },
    restoreField (field) {
        if(field.field.type === "folder") {
            Fields.insert({_id: field.field._id, name: field.field.name, user: field.field.user, type:"folder"});
            History.find({"field.folder": field.field._id}).fetch().map((fieldDeleted)=>{
                Fields.insert({name: fieldDeleted.field.name, key: fieldDeleted.field.key, count: fieldDeleted.field.count, user: fieldDeleted.field.user, folder: fieldDeleted.field.folder, type:"field"})
                History.remove({_id:fieldDeleted._id})
            })
            History.remove({"field._id": field.field._id});
        }
        else {
            if(History.find({"field._id": field.field.folder})){
                History.find({"field._id": field.field.folder}).fetch().map((folder)=>{
                    Fields.insert({_id: folder.field._id, name: folder.field.name, user: folder.field.user, type:"folder"});
                    History.remove({_id:folder._id})
                })
                Fields.insert({name: field.field.name, key: field.field.key, count: field.field.count, user: field.field.user, folder: field.field.folder, type:"field"})
                History.remove({_id:field._id})
            }
            else {
                Fields.insert({name: field.field.name, key: field.field.key, count: field.field.count, user: field.field.user, folder: field.field.folder, type:"field"})
                History.remove({_id:field._id})
            }
        }
    }
})
Meteor.publish('getFields', function () {
    return Fields.find();
})
Meteor.publish('getHistory', function () {
    return History.find();
})


Meteor.startup(async () => {
    Meteor.publish(null, function () {
        if (this.userId) {
            return [
                Meteor.users.find({ _id: Meteor.userId() }, {
                    fields: {
                        _id: 1,
                        // createdAt: 1,
                        // services: 1,
                        emails: 1,
                        folder: 1,
                    },
                }),
            ];
        } else {
            this.ready();
        }
    });
});
