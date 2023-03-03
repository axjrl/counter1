import React from 'react';
import {useState} from "react";
import './MainContent.scss';
import Counter from "./Counter/Counter";
import History from "./History/History";
export const MainContent = () => {
    const [selectedItem, setSelectedItem] = useState("counter")

    return (
        <div className="mainContent">
            <div className="menu">
                <div style={selectedItem ==="counter" ? {backgroundColor:"#414042", color:"white", borderRadius: "10px 0 0 10px"} : {}} onClick={()=>setSelectedItem("counter")} className="menu__item">
                    <p>COUNTER</p>
                </div>
                <div style={selectedItem ==="history" ? {backgroundColor:"#414042", color:"white", borderRadius: "0 10px 10px 0"} : {}} onClick={()=>setSelectedItem("history")} className="menu__item">
                    <p>HISTORY</p>
                </div>
            </div>
            {selectedItem ==="counter" ? <Counter/> : <History/>}
        </div>
    );
}

export default MainContent;