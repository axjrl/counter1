import React, {useState} from 'react';
import Header from "./Header/Header";
import RegLogForm from "./RegLogForm/RegLogForm";
import {
    BrowserRouter,
    Route,
    Routes, Navigate
} from "react-router-dom";
import ActionHistory from "./MainContent/History/ActionHistory";
import Counter from "./MainContent/Counter/Counter";
import Footer from "./Footer/Footer";
import Table from "./MainContent/Counter/Table";
import {ToastContainer} from 'react-toastify';

const LoggedIn = (props) =>{
    if (props.user) {
        return (
            <Routes>
                <Route path="/" element={<Navigate to="/folders" replace/>} />
                <Route path="/history" element={<ActionHistory />} />
                <Route path="/folders" element={<Counter increase={props.increase} />} />
                <Route path="/folders/:folderId" element={<Table increase={props.increase} />} />
            </Routes>
        );
    }
    else {
        return <Routes>
            <Route path="*" element={<RegLogForm/>} />
        </Routes>
    }

}
export const App = () => {
    const [color, setColor] = useState("#414042");
    function increase(folderId, key) {
        Meteor.call("increaseField", Meteor.userId(), folderId, key)
        setColor("#489d34")
        setTimeout(()=> {
            setColor("#414042");
        }, 300)

    }

    return (
        <div className={"App"}>
            <BrowserRouter>
                <ToastContainer/>
                <Header color={color}/>
                <LoggedIn increase={increase} user={Meteor.userId()}/>
                <Footer/>
            </BrowserRouter>
        </div>

    );
}