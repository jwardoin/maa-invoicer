import React, { useState } from "react"
import { useEffect } from "react"
import { AiFillEdit, AiFillCloseSquare } from "react-icons/ai"
import { MdCheckBox, MdCancelPresentation } from "react-icons/md"

const SelectSetting = ({ calendars, calendarId }) => {
    const [isEditable, setIsEditable] = useState(false)
    const [settingValue, setSettingValue] = useState('')

    useEffect(() => {
        if(!settingValue){
            setSettingValue(calendarId)
        }
    }, [calendarId])
  
    const enableEdit = () => {
        setIsEditable(true)
    }

    const cancelEdit = () => {
        setIsEditable(false)
    }

    const saveEdit = async () => {
        const selectElement = document.querySelector("#lessonCalendarId")
        const response = await fetch('http://localhost:8000/accountsettings/update' , {
            method: 'put', 
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                settingName: selectElement.id,
                settingValue: selectElement.value,
            })
        })
        
        const data = await response.json()
        console.log(data)
        setSettingValue(selectElement.value)
        setIsEditable(false)
    }
    


    return (
        <div className="container">
            <label htmlFor="calendarId">Calendar Id</label>
            {isEditable ? 
            <div class="editSetting">
                <select name="calendarId" id="lessonCalendarId">
                    {calendars.map((calendar, i) => <option key={i} value={calendar[1]}>{`${calendar[0]} (Calendar Id: {${calendar[1]})`}</option>)}
                </select>
                <MdCheckBox onClick={saveEdit} />  
                <AiFillCloseSquare onClick={cancelEdit} />
            </div>
            : 
            <span>{settingValue} <AiFillEdit onClick={enableEdit}/> </span>}
        </div>
    )
}

export default SelectSetting