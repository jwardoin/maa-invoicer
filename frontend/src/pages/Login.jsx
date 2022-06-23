import React from "react";
import Google from "../img/google.png"

const Login = () => {

    const google = () => {
        window.open("http:/localhost:8000/auth/google")
    }
    return (
        <div className="login">
            <div className="wrapper">
                <div className="right">
                    <h1 className="loginTitle">Login</h1>
                    <div className="loginButton" onClick={google}>
                        <img src={Google} alt="" />
                        Google
                    </div>
                </div>
                <div className="center">
                </div>
                <div className="left">
                    <h2 className="missionStatement">Never count your lessons by hand again</h2>
                </div>
            </div>
        </div>
    )
}

export default Login