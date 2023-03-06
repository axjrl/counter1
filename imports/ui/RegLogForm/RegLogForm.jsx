import React, {useState} from 'react';
import './RegLogForm.scss'
import 'react-toastify/dist/ReactToastify.css';
import {notify} from "../notify/notify";
const RegLogForm = () => {
    const [formState, setFormState] = useState("login");

    function register(e) {
        e.preventDefault()
        Meteor.call("registerUser", e.target[0].value, e.target[1].value,(err,res) =>{
            console.log(err, res)
            if(res) {
                setFormState("login");
                notify();
            }
        })

    }
    console.log(formState)
    function login (e) {
        e.preventDefault()
        Meteor.loginWithPassword(e.target[0].value, e.target[1].value,() =>{
            window.location.reload()
        });
        notify();
    }
    return (
        <div className="loginElement">
            {formState === "login" ? <form onSubmit={(e)=>login(e)} className="registerForm">
                <p>Email: <input className="email" required type="email" name="email"/></p>
                <p>Password: <input required type="password" name="password"/></p>
                <p><input className="button" type="submit" value="Login"/></p>
            </form> : <form onSubmit={(e)=>register(e)} className="registerForm">
                    <p>Email: <input className="email" required type="email" name="email"/></p>
                    <p>Password: <input required type="password" name="password"/></p>
                    <p><input className="button" type="submit" value="Register"/></p>
                </form>}
            <div className="buttons">
                <div className="loginText" style={formState === "login" ? {display:"none"}: {}}><p>Already have an account? </p> <p onClick={()=>{setFormState("login")}} style={{cursor:"pointer", color:"#5271cb"}}>Login</p></div>
                <div className="registerText" style={formState === "register" ? {display:"none"}: {}}><p>Don't Have an Account?</p><p  style={{cursor:"pointer", color:"#5271cb"}} onClick={()=>{setFormState("register")}}>Register</p></div>
            </div>
        </div>
    );
};

export default RegLogForm;