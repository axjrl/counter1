import React from 'react';
import './Header.scss'
import {NavLink, Link} from "react-router-dom";
const Header = ({color}) => {

    return (
        <div className="header">
            <Link to={"/"}>
                <div className="logoContainer">
                    <svg width="86" height="86" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3.5" y="3.5" width="120" height="120" style={{stroke:color, transition: "stroke 100ms linear"}} strokeWidth="7"/>
                        <rect x="3.5" y="3.5" width="120" height="120" style={{stroke:color, transition: "stroke 100ms linear"}} strokeWidth="7"/>
                        <rect x="40" y="48" width="13" height="41" style={{fill:color, transition: "fill 100ms linear"}}/>
                        <rect x="26" y="75" width="13" height="41" transform="rotate(-90 26 75)" style={{fill:color, transition: "fill 100ms linear"}} />
                        <path d="M108.406 89.4551V98H70.1738V89.4551L82.1855 87.9902V39.8457H70.0273V31.6914L96.3945 26.9062V87.9902L108.406 89.4551Z" style={{fill:color, transition: "fill 100ms linear"}}/>
                    </svg>
                </div>
            </Link>
            {Meteor.userId() ? <div className="menu">
                <div
                    className="menu__item counter">
                    <NavLink to={"/folders"} className={({ isActive }) =>
                        isActive ? "menu__item__link active" : "menu__item__link"
                    }><p>COUNTER</p></NavLink>
                </div>
                <div onClick={()=>{Meteor.logout(()=>window.location.reload())}} className="menu__item logout">
                    <a className="menu__item__link"><p>LOGOUT</p></a>
                </div>
                <div className="menu__item history">
                    <NavLink to={"/history"} className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }><p>HISTORY</p></NavLink>
                </div>
            </div> : ""}
        </div>
    );
};

export default Header;