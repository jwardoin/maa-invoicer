import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Card = ({ invoice, user }) => {
    const [invoiceId, setInvoiceId] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        if(!invoiceId) {
            setInvoiceId(invoice._id)
        }
    }, [invoice])


 
    const deleteInvoice = async () => {
        const response = await fetch('http://localhost:8000/invoice/delete' , {
            method: 'delete', 
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                id: invoiceId
            })
        })
        
        const data = await response.json()
        console.log(data)
    }

    return (
        <div className="card">
            <h5>{`${invoice.displayName}`}</h5>
            <img src={user.image} alt="User Profile" className="avatar" />
            <h4 className="invoiceTitle">{`${invoice.startDate} - ${invoice.endDate}`}</h4>
            
            <div className="cardInfo">
                <ul className="invoiceInfoList">
                    <li>Total Pay: {'$'+invoice.totalPay.toFixed(2)}</li>
                    <li>Total Hours: {invoice.totalHours}</li>
                    <li>Lesson Count: {invoice.lessons.length}</li>
                    <li>Hourly Rate: ${invoice.hourlyRate}</li>
                    {invoice.holidays.length > 0 && <li>Holiday Exclusions: {invoice.holidays}</li>}
                </ul>
                
                <Link className="link" to={`/invoice/${invoice._id}`}>
                    <button className="cardButton">Read More</button>
                </Link>
                <span className="fa fa-trash" onClick={deleteInvoice}/>
            </div>
        </div>
    )
}

export default Card