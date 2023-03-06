import React from 'react';
import {toast} from "react-toastify";

export function notify (){ toast.success('Success!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
})}
