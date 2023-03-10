import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom/client";
import {App} from "../imports/ui/App";


Meteor.startup(() => {
  ReactDOM.createRoot(document.getElementById("react-target")).render(
      <App/>
  );
});


