import React from "react"

const CreateInvoice = () => {
    return (
        <div className="createInvoice card50">
            <h2>Create a New Invoice</h2>
            <div className="cardInfo">
                <form action="http://localhost:8000/newinvoice" method="POST">
                    <ul className="invoiceInfoList">
                        <li>
                            <label htmlFor="payPeriodStart">Pay Period Start</label>
                            <input type="date" name="payPeriodStart"/>
                        </li>
                        <li>
                            <label htmlFor="payPeriodEnd">Pay Period End</label>
                            <input type="date" name="payPeriodEnd"/>
                        </li>
                        
                        <input type="submit" value="Submit" className="cardButton"/>
                        
                    </ul>  
                </form>
            </div>
        </div>
    )
}

export default CreateInvoice