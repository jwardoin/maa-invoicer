/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
 function appendPre(message) { // Adds returns to DOM - I want to change this to return a table instead
    const pre = document.getElementById('content');
    const textContent = document.createTextNode(`${message} \n`);
    pre.appendChild(textContent);
  }
  
  const authorizeButton = document.getElementById('authorize_button');
  const signoutButton = document.getElementById('signout_button');
  
  document.querySelector('#invoice').addEventListener('click', fetchInvoice)
  
  // Frontend code to populate the DOM from user inputs
  function fetchInvoice() {
    // const inputs = document.querySelectorAll('fieldset > input')
    // Array.from(inputs).forEach(input => input.value)
    const calendarIDInput = document.querySelector('#calendarid').value // Remove once user can pick Calendar
    const rateInput = document.querySelector('#rate').value
    const keywordInput =  ['off','makeup','break']//document.querySelector('#exclusionKeywords').value.split(",") //hardcording for now until I can solve for an empty input
    // const exclusionKeywordsInput = document.querySelector('#__').value ?? ""
    // const exclusionDaysInput = document.querySelector('#__').value ?? ""
    const invoice = new Invoice(calendarIDInput,rateInput,keywordInput)
    invoice.printInvoice()
    console.log('Success')
  }
  
  class Invoice {
    constructor(calendarID,rate,exclusionKeywords,exclusionDays){
      this._calendarID = calendarID // Make a function that allows user to choose calendar ID from list of their Google calendars
      this._rate = rate
      this._exclusionKeywords = exclusionKeywords
      this._exclusionDays = exclusionDays
  
      // return an array of pay period start and end dates to pass into getAPIData function
      this._payPeriod = () => { 
        if(new Date().toString().split(" ")[2] === "01"){
          // if it's first day of the month, go back and grab 2nd pay period from previous month
        }
        if (new Date().toString().split(" ")[2] === "15") {
          // if it's 15th day of the month, grab 1st pay period of the month
        } 
        // return payPeriod[]
      } // Planning to use scheduled AWS Lambdas to run this code on the 15th and last day of month
    
      // Store Calendar events
      this._events = async (calendarID) => { 
        //const payPeriod = this._payPeriod()
        let payPeriodStart = new Date("Apr 22 2022").toISOString() //payPeriod[0]
        let payPeriodEnd = new Date("May 14 2022").toISOString() //payPeriod[1]
        const data = await gapi.client.calendar.events.list({
          'calendarId': calendarID,
          'timeMin': payPeriodStart, 
          'timeMax': payPeriodEnd,
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 160, // for this use case, 160 results represents a 40 hours work week or 160 thirty minute events
          'orderBy': 'startTime'
        })
        return data.result.items
      }
  
      // Returns total pay
    this._totalPay = (eventList) => {
      const events = eventList
      let invoiceHours = 0 // initialize payable hours for current pay period
      
      // Loop over events to add up pay and create a table in the DOM
      events.forEach((event, i) => {
        
        // initialize needed data from each event
        const title = event.summary.toLowerCase()
        const startMinutes = new Date(event.start.dateTime).getMinutes()
        const endMinutes = new Date(event.end.dateTime).getMinutes()
  
        // Check for keywords to exclude events from count
        if(this._exclusionKeywords.some(keyword => title.includes(keyword))) {
          return
        }
  
        // Check for days to exclude from count
        // if(this._exclusionDays.some(day => event.start.dateTime.split("-")[2].slice(0,2).includes(day))) {
        //   return
        // }
    
        // Events are either 30 minutes or 1 hours for current use case - eventually write this to handle events of any length
        if (startMinutes === endMinutes){ 
          invoiceHours += 1
        } else {
          invoiceHours += 0.5
        }
      })
      // At the end, shows total pay - this will later be turned into a table footer to store totals of all important information
      return this._rate * invoiceHours 
    }
    }
  
    async printInvoice() {
      // const calendarID = await this._calendarID()
      const events = await this._events(this._calendarID) //change to just 'calendarID' when implementing user ability to select calendar
      const totalPay = this._totalPay(events)
      events.forEach((event, i) => {
  
      // Add event to the DOM - Later want to use this to create a table by splitting the summary in different parts
        /* const infoParse = event.summary.split("")
        * if (infoParse[0].includes('Rm')){
        *   const studentName = `${infoParse[1]} ${infoParse[2]}`
        *   const room = infoParse[0]
        *   const instrument = infoParse[3]
        * }
        * if (infoParse[0] === 'OUT') {
        *   const studentName = `${infoParse[3]} ${infoParse[4]}`
        *   const room = 'Out'
        *   const instrument = infoParse[5]
        * }
        * 
        * 
        */
        appendPre(event.summary)
        })
        appendPre(`\nHours: ${totalPay/this._rate}`)
        appendPre(`\nRate: $${this._rate}`)
        appendPre(`\nTotal pay: $${totalPay}`)
      }
    }
  
  // This will likely be hosted separately on AWS Lambdas, so the class extension will need to be removed and replaced with a nearly identical class
  class AutomatedInvoice extends Invoice {
    constructor(calendarID,rate,exclusionKeywords,exclusionDays) {
      super(calendarID,rate,exclusionKeywords,exclusionDays) // Takes everything from invoice
  
      
    }
    async emailInvoice() {
      const events = await this._events(this._calendarID)
      const totalPay = this._totalPay(events)
      // Implement email functionality once Node.js is set up
  
    }
  
  }