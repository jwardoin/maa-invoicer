import React from "react";
import { Link } from "react-router-dom";

const Card = ({post}) => {

    const deleteInvoice = (id) => {
        console.log(id)
        // window.open('http://localhost:8000/invoice/delete')
    }

    return (
        <div className="card">
            <span className="title">{post.title}</span>
            <img src={post.img} alt="" className="img" />
            <p className="desc">{post.desc}</p>
            <Link className="link" to={`/invoice/${post.id}`}>
                <button className="cardButton">Read More</button>
            </Link>
            <span className="fa fa-trash" onClick={deleteInvoice}></span>
            
        </div>
    )
}

export default Card