import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillCloseSquare } from "react-icons/ai";
import { MdCheckBox } from "react-icons/md"

const InputSetting = ({ setting, settingName }) => {
    const [isEditable, setIsEditable] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [settingValue, setSettingValue] = useState('')

    const settingKey = settingName[0].toLowerCase() + (settingName.split(" ").join("").slice(1, settingName.length - 1))


    useEffect(() => {
        if(!settingValue){
            setSettingValue(setting)
        }
    }, [setting])
    
    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const enableEdit = () => {
        setIsEditable(true)
    }

    const endEdit = () => {
        setIsEditable(false)
    }

    const saveEdit = async () => {
        const settingElement = document.querySelector(`#${settingKey}`)
        const response = await fetch('http://localhost:8000/accountsettings/update' , {
            method: 'put', 
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                settingName: settingElement.id,
                settingValue: settingElement.value,
            })
        })
        
        setSettingValue(inputValue)
        endEdit()
        const data = await response.json()
        console.log(data)
    }

    return (
        <div className="container" >
            <label htmlFor={settingKey}>{settingName}</label>
            {isEditable ? 
            <div class="editSetting">
                <input type="text" name={settingKey} id={settingKey} defaultValue={settingValue} key={setting} onChange={handleChange}/>
                <MdCheckBox onClick={saveEdit} key="check"/>
                <AiFillCloseSquare onClick={endEdit} key="cancel" />
            </div> :
            <span>{settingValue} <AiFillEdit onClick={enableEdit}/></span>} 
        </div>
    )
}

export default InputSetting