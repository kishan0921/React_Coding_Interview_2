import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// important kar liya BrowserRouter ko react-router-dom se..make sure react-router-dom install ho 
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast";

const store = configureStore(
  {
    reducer:rootReducer,
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <Provider store ={store}>
      <BrowserRouter>
        {/* App Router ko Wrap kar diya BrowserRouter ke ander */}
        {/* Kyu kiya ? - Kyuki Hume Routes Create krenge App.js ke ander */}
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
