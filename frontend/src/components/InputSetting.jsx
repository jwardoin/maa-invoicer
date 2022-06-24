import React from "react";

const InputSetting = () => {
    return (
        <div className="inputSetting">
            <label htmlFor={setting}>{setting.name}</label>
            <input type="text" name={setting}  />
        </div>
    )
}