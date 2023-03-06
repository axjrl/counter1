import React, {useState} from 'react';
import Header from "./Header/Header";
import MainContent from "./MainContent/MainContent";
import Footer from "./Footer/Footer";
import RegLogForm from "./RegLogForm/RegLogForm";

export const App = () => {
    const [color, setColor] = useState("#414042");
    const [activeFolder, setActiveFolder] = useState("")


    function increase(activeFolder, key) {
        Meteor.call("increaseField", Meteor.userId(), activeFolder, key)
        setColor("#489d34")
        setTimeout(()=> {
            setColor("#414042");
        }, 300)
    }
    return (
        <div className="main">
            <Header color={color} setActiveFolder={setActiveFolder}/>
            {Meteor.userId() ?<MainContent increase={increase} setActiveFolder={setActiveFolder} activeFolder={activeFolder}/> : <RegLogForm/>}
            <Footer/>
        </div>
    )
}