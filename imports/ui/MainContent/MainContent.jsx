import React from 'react';
import {useState} from "react";
import './MainContent.scss';
import Counter from "./Counter/Counter";
import ActionHistory from "./History/ActionHistory";
export const MainContent = ({increase, setActiveFolder, activeFolder}) => {
    const [selectedItem, setSelectedItem] = useState("counter")

    return (
        <div className="mainContent">
            <div className="menu">
                <div
                    style={selectedItem ==="counter" ? {backgroundColor:"#414042", color:"white"} : {}}
                    onClick={()=>{setSelectedItem("counter");setActiveFolder("")}} className="menu__item counter">
                    <p>COUNTER</p>
                </div>
                <div onClick={()=>{Meteor.logout(()=>window.location.reload())}} className="menu__item logout">
                    <p>LOGOUT</p>
                </div>
                <div style={selectedItem ==="history" ? {backgroundColor:"#414042", color:"white", } : {}} onClick={()=>setSelectedItem("history")} className="menu__item history">
                    <p>HISTORY</p>
                </div>
            </div>
            {selectedItem ==="counter" ? <Counter increase={increase} setActiveFolder={setActiveFolder} activeFolder={activeFolder}/> : <ActionHistory/>}
        </div>
    );
}

export default MainContent;