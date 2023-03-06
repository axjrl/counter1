import React, {useState} from 'react';
import './Counter.scss'
import './Folders.scss'
import {Fields} from "../../../api/fields";

import { useTracker } from 'meteor/react-meteor-data'
import Table from "./Table";
import {notify} from "../../notify/notify";

const Counter = ({increase, setActiveFolder, activeFolder}) => {
    const [addingFieldAction, setAddingFieldAction] = useState(false)
    const [folders, setFolders] = useState([])
    const [fields, setFields] = useState([])

    useTracker(()=>{
        Meteor.subscribe('getFields')
        setFolders(Fields.find({type:"folder", user: Meteor.userId()}).fetch())
        setFields(Fields.find({type:"field", user: Meteor.userId()}).fetch())
    },[])
    function handleSubmit (event) {
        let name = event.target[0].value;
        event.preventDefault();
        Meteor.call("createFolder", name, Meteor.userId());
        setAddingFieldAction(false)
        notify();
    }
    console.log(folders)
    return (
        <div>
            {!activeFolder ? <div className="folders">
                <div className="folders__row">
                    <p className="folders__row__name" style={{fontWeight:"bold", fontSize:25}}>NAME</p>
                    <p className="folders__row__name" style={{fontWeight:"bold", fontSize:25}}>FIELDS</p>
                </div>
                {folders ? folders.map((folder)=> {
                    return <div key={folder._id} className="folders__row">
                        <p className="folders__row__name">{folder.name}</p>
                        <p className="folders__row__name">{fields.filter((field)=>{return field.folder === folder._id}).length}</p>
                        <button className="folders__row__open" onClick={()=>{setActiveFolder(folder._id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="30px"
                                 version="1.1" viewBox="0 0 512 347.28"
                            >
                                <g id="Layer_x0020_1">
                                    <path d="M121.35 118.09l260.64 0 0 -31.3c0.73,-7.76 -4.67,-9.69 -11.24,-9.98 -3.77,-0.18 -7.97,-0.2 -11.76,-0.01l-150.17 0c-36.03,0 -43.17,-19.04 -49.96,-37.13 -3.87,-10.32 -7.56,-20.17 -22.65,-20.17l-104.38 0c-6.76,0 -12.33,5.57 -12.33,12.33l0 253.04 61.44 -139.95c6.5,-14.82 24.13,-26.83 40.41,-26.83zm280.14 0l86.05 0c19.11,0 29.72,16.28 21.83,34.29l0.03 0.01 -73.77 168.06c-6.5,14.83 -24.14,26.83 -40.41,26.83l-366.19 0c-7.65,0 -13.84,-2.56 -18.08,-6.74 -6.2,-5.19 -10.95,-17.13 -10.95,-25.05l0 -283.66c0,-17.52 14.31,-31.83 31.83,-31.83l104.38 0c28.52,0 34.55,16.06 40.86,32.89 4.46,11.89 9.15,24.4 31.75,24.4 51.2,0 102.48,0.33 153.67,0.02 3.05,-0.03 6.18,-0.06 9.1,0.07 16.41,0.76 30.82,5.4 29.88,29.41l0.02 31.3zm85.97 19.05l-366.19 0c-8.66,0 -19,7.42 -22.44,15.25l-73.77 168.06 -0.03 -0.01c-2.05,4.68 -1.46,7.8 4.07,7.8l366.2 0c8.66,0 18.99,-7.43 22.43,-15.26l73.77 -168.06c0.07,0.03 4.09,-7.78 -4.04,-7.78z"/>
                                </g>
                            </svg>
                        </button>
                        <button className="folders__row__open trashCan" onClick={()=>{Meteor.call("deleteFolder",folder._id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                        </button>
                    </div>
                }) : "No folders"}
                <div className="options">
                    <div style={{opacity: !addingFieldAction ? "0" : "1",
                        transition: "all .2s",
                        visibility: !addingFieldAction ? "hidden" : "visible",}}>
                        <form className="inputFieldForm" onSubmit={(event)=>handleSubmit(event)}>
                            <div className="inputFieldForm__input">
                                <p>Name</p>
                                <input required className="inputFieldForm__name folderName" type="text" name="name"/>
                            </div>
                            <div className="inputFieldForm__input">
                                <input className="inputFieldForm__save" type="submit" value="Save"/>
                            </div>
                        </form>
                    </div>
                    <button className="addField" onClick={()=>{setAddingFieldAction(!addingFieldAction)}}>{addingFieldAction ? "CLOSE":"ADD"}</button>
                </div>
            </div>: <Table increase={increase} activeFolder={activeFolder} setActiveFolder={setActiveFolder}/>}
        </div>
    );
};

export default Counter;