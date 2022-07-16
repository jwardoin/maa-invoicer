import React from "react";
import InputSetting from "../components/InputSetting";
import SelectSetting from "../components/SelectSetting";

const AccountSettings = ({ user, onSettingChange }) => {

    return (
        <div className="accountSettings">
            <div className="wrapper">
                <h1>Account Settings</h1>
                {user.hourlyRate === 0 || user.lessonCalendarId === "Please Choose a Calendar" && <span style={{color: "red"}}>Set Your Rate and Calendar Id</span>}
                <InputSetting setting={user.displayName} settingName="Display Name" onSettingChange={onSettingChange} />
                <InputSetting setting={user.hourlyRate} settingName="Hourly Rate" onSettingChange={onSettingChange} />
                <SelectSetting calendars={user.googleCalendarIds} calendarId={user.lessonCalendarId} onSettingChange={onSettingChange} />
            </div>
        </div>
    )
}

export default AccountSettings