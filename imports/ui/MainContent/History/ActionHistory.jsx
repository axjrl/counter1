import React, {useState} from 'react';
import {History} from "../../../api/history";
import { useTracker } from 'meteor/react-meteor-data';
import './ActionHistory.scss';

const ActionHistory = () => {
    const [history, setHistory] = useState([])

    useTracker(()=>{
        Meteor.subscribe('getHistory')
        setHistory(History.find({user: Meteor.userId()}).fetch().sort(function(a,b){
            return new Date(b.timestamp) - new Date(a.timestamp);
        }))
    },[])
    return (
        <div className="historyContainer">
            {history.map((action)=> {
                return <div className="history">
                    <div className="history__action">{action.action === "remove" ? <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg> :
                        action.action
                    }</div>
                    <p>Date: {action.timestamp.toLocaleString()}</p>
                    <p>Name: {action.field.name}</p>
                    <div style={{display:"flex"}}>
                        <p className="history__type">Type: {action.field.type}</p>
                        {action.field.type === "folder" ? <div className="type"> <svg xmlns="http://www.w3.org/2000/svg"
                                                                                      width="30px"
                                                                                      version="1.1" viewBox="0 0 512 347.28"
                        >
                            <g id="Layer_x0020_1">
                                <path d="M121.35 118.09l260.64 0 0 -31.3c0.73,-7.76 -4.67,-9.69 -11.24,-9.98 -3.77,-0.18 -7.97,-0.2 -11.76,-0.01l-150.17 0c-36.03,0 -43.17,-19.04 -49.96,-37.13 -3.87,-10.32 -7.56,-20.17 -22.65,-20.17l-104.38 0c-6.76,0 -12.33,5.57 -12.33,12.33l0 253.04 61.44 -139.95c6.5,-14.82 24.13,-26.83 40.41,-26.83zm280.14 0l86.05 0c19.11,0 29.72,16.28 21.83,34.29l0.03 0.01 -73.77 168.06c-6.5,14.83 -24.14,26.83 -40.41,26.83l-366.19 0c-7.65,0 -13.84,-2.56 -18.08,-6.74 -6.2,-5.19 -10.95,-17.13 -10.95,-25.05l0 -283.66c0,-17.52 14.31,-31.83 31.83,-31.83l104.38 0c28.52,0 34.55,16.06 40.86,32.89 4.46,11.89 9.15,24.4 31.75,24.4 51.2,0 102.48,0.33 153.67,0.02 3.05,-0.03 6.18,-0.06 9.1,0.07 16.41,0.76 30.82,5.4 29.88,29.41l0.02 31.3zm85.97 19.05l-366.19 0c-8.66,0 -19,7.42 -22.44,15.25l-73.77 168.06 -0.03 -0.01c-2.05,4.68 -1.46,7.8 4.07,7.8l366.2 0c8.66,0 18.99,-7.43 22.43,-15.26l73.77 -168.06c0.07,0.03 4.09,-7.78 -4.04,-7.78z"/>
                            </g>
                        </svg> </div>: <div className="type"><svg width="30px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#444" d="M16 5c0-0.6-0.4-1-1-1h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6zM15 11h-14v-6h14v6z"></path>
                            <path fill="#444" d="M2 6h1v4h-1v-4z"></path>
                        </svg></div>  }
                    </div>
                    {action.field.count !== undefined ?<p className="history__value">Value: {action.field.count}</p> : <p style={{color: "rgba(65,64,66,0.37)"}}>No value</p>}
                    <p>Action: {action.action}</p>
                    <button onClick={()=>Meteor.call("")}>Restore</button>
                </div>
            })}
        </div>
    );
}

export default ActionHistory;