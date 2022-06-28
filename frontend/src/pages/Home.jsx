import React from "react";
import Card from "../components/Card"
import CreateInvoice from "../components/CreateInvoice";


const Home = ( {invoices, user} ) => { 
    const overallPay = invoices.reduce((acc, invoice) => acc + invoice.totalPay, 0).toFixed(2)
    const overallLessons = invoices.reduce((acc, invoice) => acc + invoice.lessons.length, 0)
    return (
    <div className="home">
        <h1 className="pageTitle">Dashboard</h1>
        <div className="invoices">
            <div className="invoicesSummary card50">
                <h2>Invoicing Summary</h2>
                <div className="cardInfo">
                    <ul className="invoiceInfoList">
                        <li>Submitted Invoices: {invoices.length}</li>
                        <li>Overall Pay: ${overallPay}</li>
                        <li>Overall Lessons: {overallLessons}</li>
                        <li>Suggest Tax Savings: ${(overallPay * .153).toFixed(2)}</li>
                    </ul>
                </div>
            </div>
            <CreateInvoice />
        </div>
        <h2>Invoices</h2>
        <div className="invoices">
            
            {invoices.map(i=>(
                <Card key={i._id} invoice={i} user={user} />
            ))}
        </div>
    </div>
    )
}

export default Home