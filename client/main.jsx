import React from 'react';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


Meteor.startup(() => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ]);

  ReactDOM.createRoot(document.getElementById("react-target")).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>

  );

});


