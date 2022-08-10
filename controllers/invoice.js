const Invoice = require('../models/Invoice');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

module.exports = {
  deleteInvoice: async (req, res) => {
    try {
      await Invoice.findOneAndDelete({ _id: req.body.id });
      res.json({ msg: 'Invoice deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  createInvoice: async (req, res) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        '/auth/google/callback'
      );

      let pathToJSON = path.resolve(
        `./config/tokens/${req.user.googleId}_tokens.json`
      );
      const token = JSON.parse(fs.readFileSync(pathToJSON));
      oauth2Client.setCredentials(token);

      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

      // Data to pass into Google API call
      const calendarId = req.user.lessonCalendarId;
      const payPeriodStart = new Date(
        '00:00:00 ' + req.body.payPeriodStart
      ).toISOString();
      const payPeriodEnd = new Date(
        '23:59:59 ' + req.body.payPeriodEnd
      ).toISOString();

      const data = await calendar.events.list({
        calendarId: calendarId,
        timeMin: payPeriodStart,
        timeMax: payPeriodEnd,
        showDeleted: false,
        singleEvents: true,
        maxResults: 160,
        orderBy: 'startTime',
      });

      function getPayableEvents() {
        // Handle for Holidays
        if (req.body.holidayStart && req.body.holidayEnd) {
          const holidayStart = Number(req.body.holidayStart.split('-')[2]);
          const holidayEnd = Number(req.body.holidayEnd.split('-')[2]);
          function holidayHander() {
            return Array.from(
              new Array(holidayEnd + 1 - holidayStart),
              (_, i) => holidayStart + i
            );
          }
        }

        // Keywords that always appear in nonpaying events
        const exclusionKeywords = ['off', 'makeup', 'break', '---'];

        // Check if event happens on holiday or has disqualifying keywords
        const removeNoPayEvents = data.data.items.filter(
          (event) =>
            !exclusionKeywords.some((keyword) =>
              event.summary.toLowerCase().includes(keyword)
            ) &&
            (typeof holidayHander === 'function'
              ? !holidayHander().some(
                  (day) =>
                    Number(event.start.dateTime.split('T')[0].split('-')[2]) ===
                    day
                )
              : 1)
        );

        // Get time of event in hours
        function parseTime(startTime, endTime) {
          return (
            (new Date(endTime).getTime() - new Date(startTime).getTime()) /
            3600000
          );
        }

        // Remove nonpaying events and return event name and time in hours
        const payableEvents = removeNoPayEvents.map((event) => {
          return [
            event.summary,
            parseTime(event.start.dateTime, event.end.dateTime),
          ];
        });

        return payableEvents;
      }

      const eventList = getPayableEvents();
      const totalHours = eventList.reduce((a, b) => a + b[1], 0);
      const totalPay = totalHours * req.user.hourlyRate;

      const newInvoice = {
        googleId: req.user.googleId,
        displayName: req.user.displayName,
        startDate: req.body.payPeriodStart,
        endDate: req.body.payPeriodEnd,
        lessons: eventList,
        totalHours: totalHours,
        totalPay: totalPay,
        hourlyRate: req.user.hourlyRate,
      };

      const invoice = await Invoice.create(newInvoice);
      res.json(invoice);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};
