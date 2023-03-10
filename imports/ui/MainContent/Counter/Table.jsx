import React, {useState, useEffect} from 'react';
import {Fields} from "../../../api/fields";
import { useTracker } from 'meteor/react-meteor-data'
import './Counter.scss'
import {notify} from "../../notify/notify";
import {Link, useParams} from 'react-router-dom'

const Table = ({increase}) => {

    const [actionInput, seActionInput] = useState(false);
    const [addingFieldAction, setAddingFieldAction] = useState(false);
    const [fields, setFields] = useState([])
    const [pressedKey, setPressedKey] = useState('')
    const { folderId } = useParams();


    function handleSubmit (event) {
        let name = event.target[0].value;
        event.preventDefault();
        Meteor.call("insertField", name, pressedKey, Meteor.userId(), folderId);
        setAddingFieldAction(false)
        notify();
    }

    useTracker(()=>{
        Meteor.subscribe('getFields')
        setFields(Fields.find({type:"field", user: Meteor.userId(), folder: folderId}).fetch())
    },[])


    useEffect(() => {
        function handleKeyDown(e) {
            if (addingFieldAction) {
                if (actionInput) {
                    setPressedKey(e.code)
                }
            }
            else {
                if (fields.filter((field)=>{return field.key === e.code}).length > 0) {
                    increase(folderId, e.code);
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown);

        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [addingFieldAction, actionInput, fields]);
    function converter(key){
        if (key.startsWith('Key')) {
            return key.replace("Key", '')
        }
        if (key.startsWith('Digit')) {
            return key.replace("Digit", '')
        }
        else {
            return key
        }
    }
    return (
        <div className="counter__table" style={{display: "flex"}}>
            <div className="counter">
                <div className="counter__table__row">
                    <p className="counter__table__row__name" style={{fontWeight:"bold", fontSize:25}}>NAME</p>
                    <p className="counter__table__row__key" style={{fontWeight:"bold", fontSize:25, color:"#414042"}}>KEY</p>
                    <p className="counter__table__row__count" style={{fontWeight:"bold", fontSize:25}}>COUNT</p>
                </div>
                { fields.length > 0 ? fields.map((field)=> {
                    return <div key={field._id} className="counter__table__row">
                        <button className="counter__table__row__delete" onClick={()=>{Meteor.call("deleteField", Meteor.userId(), folderId, field.key, field._id);notify();}}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></button>
                        <p className="counter__table__row__name">{field.name}</p>
                        <p className="counter__table__row__key">{converter(field.key?.toString())}</p>
                        <div className="counter__table__row__count">
                            <p>{field.count}</p>
                            <button className="counter__table__row__decrease" onClick={()=>Meteor.call("decreaseField", Meteor.userId(), folderId, field.key)}>-1</button>
                            <button className="counter__table__row__increase" onClick={()=>increase(folderId, field.key)}>+1</button>
                            <button className="counter__table__row__reset" onClick={()=>Meteor.call("resetField", Meteor.userId(), folderId, field.key)}>0</button>
                        </div>
                    </div>
                }) : <p className="noFolders">No fields</p>}
                <div className="options">
                    <div style={{opacity: !addingFieldAction ? "0" : "1",
                        transition: "all .2s",
                        visibility: !addingFieldAction ? "hidden" : "visible",}}>
                        <form className="inputFieldForm" onSubmit={(event)=>handleSubmit(event)}>
                            <div className="inputFieldForm__input">
                                <p>Name</p>
                                <input required className="inputFieldForm__name" type="text" name="name"/>
                            </div>
                            <div className="inputFieldForm__input">
                                <p>Key bind</p>
                                <input required className={"inputFieldForm__key"} value={pressedKey}
                                       onChange={()=>{}}
                                       onBlur={()=>seActionInput(false)}
                                       onFocus={()=>{seActionInput(true)}} type="text" />
                            </div>
                            <div className="inputFieldForm__input">
                                <input className="inputFieldForm__save" type="submit" value="Save"/>
                            </div>
                        </form>
                    </div>
                    <div style={{display:"flex"}}>
                        <button className="addField" onClick={()=>{setAddingFieldAction(!addingFieldAction)}}>{addingFieldAction ? "CLOSE": "ADD"}</button>
                        <Link to="/folders" className="link"><button className="addField back">Back to folders</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;