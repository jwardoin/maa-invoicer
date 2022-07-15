import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Card = ({ invoice, user, onDelete }) => {
    return (
        <div className="card">
            <div className="cardTitle">
                <button className="fa fa-trash dltBtn" onClick={() => onDelete(invoice._id)}/>
                <h5>{`${invoice.displayName}`}</h5>
                <img src={user.image} alt="User Profile" className="avatar" />
                <h4 className="invoiceTitle">{`${invoice.startDate} - ${invoice.endDate}`}</h4>
            </div>
            
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
            </div>
        </div>
    )
}

export default Card