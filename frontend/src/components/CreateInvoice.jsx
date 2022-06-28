import React from "react"
import { useState } from "react"

const CreateInvoice = () => {
    const [showHolidays, setShowHolidays] = useState(false)

    const handleCheck = (e) => {
        setShowHolidays(e.target.checked)
    }

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
                        <label className="holidayCheckLabel">Holidays</label>
                        <input type="checkbox" className="holidayCheck" name="holiday" onClick={handleCheck}/>

                        {showHolidays && [<li>
                            <label htmlFor="holidayStart">Holiday Start</label>
                            <input type="date" name="holidayStart"/>
                        </li>,
                        <li>
                            <label htmlFor="holidayEnd">Holiday End</label>
                            <input type="date" name="holidayEnd"/>
                        </li>]
                        }                       
                        
                        <input type="submit" value="Submit" className="cardButton"/>
                        
                    </ul>  
                </form>
            </div>
        </div>
    )
}

export default CreateInvoice