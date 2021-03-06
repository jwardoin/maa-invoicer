import React from "react";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

const Invoice = ({ invoices }) => {
    const [invoiceInfo, setInvoiceInfo] = useState({})

    
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const invoice = invoices.find(invoice=>invoice._id.toString() === path)


    // attempting to save info in state, so reload doesn't break page
    useEffect(() => {
        if(!invoiceInfo) {
            setInvoiceInfo(invoice)
        }
    })

    return (
        <div className="longInvoice">
            <div className="container">
                <h1>{`${invoice.startDate} - ${invoice.endDate}`}</h1>
                <div className="cardInfo">
                <ul className="invoiceInfoList">
                    <li>Total Hours: {invoice.totalHours}</li>
                    <li>Lesson Count: {invoice.lessons.length}</li>
                    <li>Hourly Rate: ${invoice.hourlyRate}</li>
                    <li>Total Pay: {'$'+invoice.totalPay.toFixed(2)}</li>
                    {invoice.holidays.length > 0 && <li>Holiday Exclusions: {invoice.holidays}</li>}
                </ul>
                </div>
                <div>
                    <table>
                            <tbody>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Lesson Summary
                                    </th>
                                    <th>
                                        Hours
                                    </th>
                                </tr>
                                
                                {invoice.lessons.map((lesson, i) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{lesson[0]}</td>
                                        <td>{lesson[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>     
        </div>
    )
}

export default Invoice