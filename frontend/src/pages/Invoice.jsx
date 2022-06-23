import React from "react";
import { useLocation } from "react-router-dom";
import { posts } from "../data"

const Invoice = () => {
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const invoice = posts.find(invoice=>invoice.id.toString() === path)
    return (
        <div className="invoice">
            <img src={invoice.img} alt="" />
            <h1 className="invoiceTitle">{invoice.title}</h1>
            <p className="invoiceDesc">{invoice.desc}</p>
            <p className="invoiceLongDesc">{invoice.longDesc}</p>
        </div>
    )
}

export default Invoice