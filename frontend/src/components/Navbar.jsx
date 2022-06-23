import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({user}) => {
    return (
        <div className='navbar'>
            <span className="logo"><Link className="link" to='/'>MAA Invoicer</Link></span>
            { user ? (
                <ul className="list">
                    <li className="listItem">
                        <img src={user.image} alt="usernamehere" className="avatar" />
                    </li>
                    <li className="listItem">UserName Here</li>
                    <li className="listItem">AccountSettings</li>
                    <li className="listItem">Logout</li>
                </ul>
            ) : (<Link className="link" to="login">Login</Link>)
        }
        </div>
    )
}

export default Navbar