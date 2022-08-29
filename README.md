# Music Academy of Acadiana Invoicer

This application was built to support a staff of more than 30 contract instructors in creating invoices. Before, instructors needed to hand count each payable event on their Google calendar. Using this app, instructors have been able to save time and avoid human error when completing and submitting their bimonthly invoices.

![MAA Dashboard](https://lh3.googleusercontent.com/ZeHu2yOiFgBl_NaY8NOQhGHTzk94dkvRjwb3FSu_rmjJ97EDyneH6HDD6m0zasbUnw9If0KnqSzkZiA1EpYeOOiveYM7Cxr1oLhSK7HXnqSZNYi6BFqvPQ2AVg61S33hum8G88w4eQxvzEmE5ffAHfK6Rb30BNdDQ3irKu1DBB0tH1RpSDCtCVJCi4-UwWIKbhyEPKUVdhM3zHTKHRT6PzfIYK9KcCXaYn6WQqaOk8gJfs-AMVc_bqAx8JJ-BORXv71E3UIe9TPy2rLr4z1kHFGZCYiXNF5gKqcE-bOdlWBuZuRDjzYTwx7afaHGwkicLSdsTqIE5E3NypS4kHhkThuhTyLKCH4MUHu2cJtzJdrrTsw5P7ZYHhdjDAYCS7CrVbvPp73jVPV27WKeXtzFexDu-7kuIMbuJthSH_fNOUXl1PAsk_zg9uSeIOAMo6LLdePxGWuBmjCO3KnLdrYduEY-ei0Va0iBK74aqMIJPSfAnaqjDwOLt6AuQNVoHbu3c0a5_7QPdajmLP-5wp0PRIlANI2wWn3U-JHc5BFk-em6fYHMzRXhVufLIaqIeXJAN5m8jQWqwiVQVe70pe64yUX7HNmJ9YPN6e_JsBLsw1och-maN2Ldr_vvalS-ykUP6ons5KeaJLqvk1LHDUCRrRgl3AmXRQAnwq6DliODYGXR6eNesNZZVyZbaDJQgQmmtcQYBb6PW5DLZUqxYBYFLJHQnRcatGAoBMneQQyQKskFl7In_XNezQtkRuGJ5j62taz2fPgdjBfjCBS64jLzAMv4d4bZivMklrgNuArKZEKiXenKK5t14hNfxkdRmj2xkVyElA=w1899-h937-no?authuser=0)

## How It's Made:

**Tech used:** React.js, Node.js, Express.js, MongoDB, Mongoose, Javascript, CSS3

To generate invoices from the user's Google Calendar, Google Calendar API integration was necessary for this application to take in event data and distill it down to a proper invoice. Using Passport.js, users authenticate with Google, whereafter their Google profile data along with a list of their calendars pulled from the Calendar API are passed to the Node.js server and then to MongoDB to create a user profile for this application. Users are then required to visit their account settings and select their payable calendar from the list as well as input their hourly rate. Once settings are accurate, users can input a date range for their pay period and hit submit; this will call the Google Calendar API, requesting all events from their selected calendar within the submitted date range, and produce an invoice that will be stored in the database and passed to the frontend for display. In the dashboard, short-form invoices will be mapped to the page, and users can interact with each invoice in several ways: clicking a 'Read More' button to view a long-form invoice, clicking the trash icon to delete, etc.

## On the Roadmap:

- Add an "add to clipboard" button to copy/paste invoice data

- Add email to authentication scopes, so formatted invoices can be passed directly to a draft in the user's Gmail account

- Add a company object to User Schema for storing company name, email, etc - handle user adding multiple companies to generate invoices simultaneously for more than one contractee

- Create a generic version of this application for white labeling

- Handle for variable, unpayable events such as holidays

- Create a sort button for users to sort invoices by date, pay, etc.

- Use AWS Serverless architecture to track users of app by pinging an API when a user is created/deleted and passing the current user count from database to DynamoDB via AWS Lambda - my cloud resume will display the user count

- Add ability for user to change website theme

## Final Thoughts:

- Authentication libraries are a godsend - I'm only just beginning to understand the high-level design of Google's authentication servers, so without a library like Passport.js, I may still be stuck on Google authentication; even more so if I needed to include authentication with multiple platforms such as Facebook, Github, etc.

- Storing access tokens at the time of authentication to be used for calling the Google API later in the app was one of my first major roadblocks. I learned that sometimes we need to let concepts digest before enacting a suitable solution. Once I realized I couldn't just store the access tokens in a variable but instead needed to persist the token somewhere the server could retrieve it, I was off to the races; it did however take some time for me to have that realization.

- React is such a powerful tool for building user interfaces - implementing a design with excellent usability was a weak point for me when using vanilla HTML and CSS, but with React, I feel like I leveled up greatly in that aspect. This was the first project I completed with React and greatly look forward to using it on the next one!

## Examples:

Take a look at these other examples that I have in my own portfolio:

**Cloud Resume:** https://github.com/jwardoin/cloud-resume

**CodeWars Solutions:** https://github.com/jwardoin/code-wars-problems
