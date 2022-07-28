import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {

    const serverURI = 'http://localhost:8000/'

    const logout = async () => {
        window.open(`${serverURI}auth/logout`, '_self')
    }

    return (
        <div className='navbar'>
            <span className="logo"><Link className="link" to='/'>MAA Invoicer</Link></span>
            { user ? (
                <ul className="list">
                    <li className="displayName">{user.displayName}</li>
                    <li>
                        <img src={user.image} alt={user.displayName} className="avatar" />
                    </li>
                    <li><Link className="link" to={`/accountsettings/`}>Account Settings</Link></li>
                    <li onClick={logout}>Logout</li>
                </ul>
            ) : (<a href={`${serverURI}auth/google`} className="link">Login</a>)
        }
        </div>
    )
}

export default Navbar