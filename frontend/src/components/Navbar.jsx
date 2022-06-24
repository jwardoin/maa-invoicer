import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({user}) => {

    const logout = async () => {
        window.open('http://localhost:8000/auth/logout', '_self')
    }

    return (
        <div className='navbar'>
            <span className="logo"><Link className="link" to='/'>MAA Invoicer</Link></span>
            { user ? (
                <ul className="list">
                    <li className="listItem">{user.displayName}</li>
                    <li className="listItem">
                        <img src={user.image} alt="usernamehere" className="avatar" />
                    </li>
                    <li className="listItem"><Link className="link" to={`/accountsettings/${(user.firstName+user.lastName)}`}>Account Settings</Link></li>
                    <li className="listItem" onClick={logout}>Logout</li>
                </ul>
            ) : (<Link className="link" to="login">Login</Link>)
        }
        </div>
    )
}

export default Navbar