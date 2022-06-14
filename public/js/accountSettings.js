const editBtn = document.querySelectorAll('.edit')


Array.from(editBtn).forEach(btn=>btn.addEventListener('click', changeToForm))


function changeToForm(){
    const settingName = this.parentNode.dataset.settingname
    if(settingName === 'lessonCalendarId'){
        const calendarList = document.querySelector('#calendarSelect')
        // const replacer = `<p data-calendarId='${settingName}'><button class='check'>check</button> <button class='cancel'>X</button></p>`
        // this.parentNode.outerHTML = replacer
        this.parentNode.innerHTML = "<button class='check'>check</button> <button class='cancel'>X</button>"
        calendarList.classList.toggle('hidden') 

    } else {
        this.parentNode.innerHTML = "<input type='text'> <button class='check'>check</button> <button class='cancel'>X</button>"
    }

    const checkBtn = document.querySelectorAll('.check')
    const cancelBtn = document.querySelectorAll('.cancel')

    Array.from(checkBtn).forEach(btn=>btn.addEventListener('click', editSetting))
    Array.from(cancelBtn).forEach(btn=>btn.addEventListener('click', cancelChange))
}

async function editSetting(){

    try {
        let keyValue, propValue
        const settingName = this.parentNode.dataset.settingname
        if(settingName === 'lessonCalendarId') {
            const calendarList = document.querySelector('#calendarSelect').options
            keyValue = settingName
            propValue = calendarList[calendarList.selectedIndex].dataset.calendarid
        } else {
            keyValue = this.parentNode.dataset.settingname
            propValue = this.parentNode.childNodes[0].value
        }
        const response = await fetch(`/accountsettings/${keyValue}`, {
            method: 'put',
            headers:  {'Content-type': 'application/json'},
            body: JSON.stringify({
                setting: propValue
            })
        })

        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.error(err)
    }
}

function cancelChange() {
    location.reload()
}