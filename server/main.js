import { Meteor } from 'meteor/meteor';
import {Fields} from "../imports/api/fields";



Meteor.methods({
    insertField (name, key) {
        Fields.insert({name: name, key: key, count: 0})
    },
    increaseField (key) {
        Fields.update({key:key}, {$inc: {"count": 1}})
    }
})
Meteor.publish('getFields', function () {
    return Fields.find();
})

Meteor.startup(async () => {


});
