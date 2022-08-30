import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App/App";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import NoPage from "./pages/NoPage/NoPage";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="*" element={<NoPage/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);