import React from "react";
import { useLocation } from "react-router-dom";

const Invoice = ({ invoices }) => {
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const invoice = invoices.find(invoice=>invoice._id.toString() === path)
    return (
        <div className="invoice">
            {/* <img src={invoice.img} alt="" />
            <h1 className="invoiceTitle">{invoice.title}</h1>
            <p className="invoiceDesc">{invoice.desc}</p>
            <p className="invoiceLongDesc">{invoice.longDesc}</p> */}
        </div>
    )
}

export default Invoice