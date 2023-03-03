import React, {useState, useEffect, useRef} from 'react';
import './Counter.scss'
import {Fields} from "../../../api/fields";

import { useTracker } from 'meteor/react-meteor-data'
const Counter = () => {
    const [addingFieldAction, setAddingFieldAction] = useState(false);
    const [fields, setFields] = useState([])
    const [pressedKey, setPressedKey] = useState('')
    const [actionInput, seActionInput] = useState(false)


    useTracker(()=>{
        Meteor.subscribe('getFields')
        setFields(Fields.find().fetch())
    },[])

    function handleSubmit (event) {
        let name = event.target[0].value;
        event.preventDefault();
        Meteor.call("insertField", name, pressedKey);
        setAddingFieldAction(false)
    }
    const ref = useRef(null)

    useEffect(() => {
        function handleKeyDown(e, addingFieldAction) {
            if (ref.current && ref.current.className.split("__").includes("focused")) {
                setPressedKey(e.code)
            }
            else {
                Meteor.call("increaseField", e.code)
            }

        }
        document.addEventListener('keydown', handleKeyDown);

        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);
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
        <div className="counter">
            <div className="options">
                <button className="addField" onClick={()=>{setAddingFieldAction(!addingFieldAction)}}>{addingFieldAction ? "CLOSE": "ADD FIELD"}</button>
                {addingFieldAction ? <div>
                    <form className="inputFieldForm" onSubmit={(event)=>handleSubmit(event)}>
                        <div className="inputFieldForm__input">
                            <p>Name</p>
                            <input required className="inputFieldForm__name" type="text" placeholder="type..." name="name"/>
                        </div>
                        <div className="inputFieldForm__input">
                            <p>Key bind</p>
                            <input required className={actionInput ? "inputFieldForm__key__focused": "inputFieldForm__key"} value={pressedKey}  ref={ref}
                                   onBlur={()=>seActionInput(false)}
                                   onFocus={()=>{seActionInput(true)}} placeholder="key" type="text" />
                        </div>
                        <div className="inputFieldForm__input">
                            <input className="inputFieldForm__save" type="submit" value="Save"/>
                        </div>
                    </form>
                </div> : ""}
            </div>
            <div className="counter__table" style={{display: "flex"}}>
                <div className="counter__table__row">
                    <p className="counter__table__row__name" style={{fontWeight:"bold", fontSize:25}}>NAME</p>
                    <p className="counter__table__row__key" style={{fontWeight:"bold", fontSize:25}}>KEY</p>
                    <p className="counter__table__row__count" style={{fontWeight:"bold", fontSize:25}}>COUNT</p>
                </div>
                {fields.map((field)=> {
                    return <div key={field._id} className="counter__table__row">
                        <p className="counter__table__row__name">{field.name}</p>
                        <p className="counter__table__row__key">{converter(field.key.toString())}</p>
                        <p className="counter__table__row__count">{field.count}</p>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Counter;