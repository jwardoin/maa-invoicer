import React from "react"
import { useState, useEffect } from "react"

const CreateInvoice = ({ userSetting, onAdd }) => {
    const [showHolidays, setShowHolidays] = useState(false)
    const [settingWarning, setSettingWarning] = useState(true)

    const handleCheck = (e) => {
        setShowHolidays(e.target.checked)
    }

    useEffect(() => {
        if(userSetting > 0) {
            setSettingWarning(false)
        } else {
            setSettingWarning(true)
        }
    }, [userSetting])

    return (
        <div className="createInvoice card50">
            
                <h2>New Invoice</h2>
            
            
            <div className="cardInfo">
                   {settingWarning && <span style={{color: 'red'}}>Please Set Your Calendar Id and Hourly Rate in Account Settings</span>}
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
                        <li>
                            <input type="checkbox" className="holidayCheck" name="holiday" onClick={handleCheck}/>
                        </li>
                        

                        {showHolidays && [<li>
                            <label htmlFor="holidayStart">Holiday Start</label>
                            <input type="date" name="holidayStart"/>
                        </li>,
                        <li>
                            <label htmlFor="holidayEnd">Holiday End</label>
                            <input type="date" name="holidayEnd"/>
                        </li>
                       ]
                    }                    
                    
                        <button className="cardButton" onClick={onAdd}>Submit</button>
                        
                    </ul>  
                </div>
        </div>
    )
}

export default CreateInvoice