import React from "react";
import Google from "../img/google.png"

const Login = () => {

    const googleAuth = () => {
        window.open("http://localhost:8000/auth/google", "_self")
    }

    return (
        <div className="login">
            <div className="wrapper">
                <div className="right">
                    <h1 className="loginTitle">Login</h1>
                    <div className="loginButton" onClick={googleAuth}>
                        <img src={Google} alt="Google logo" />
                        Google
                    </div>
                </div>
                <div className="center">
                </div>
                <div className="left">
                    <h2 className="missionStatement">Never count your lessons by hand again</h2>
                    <p>Generating an invoice from Google Calendar has never been easier. Login now to get started and create your invoice with just a few clicks</p>
                </div>
            </div>
        </div>
    )
}

export default Login