const Invoice = require('../models/Invoice');

module.exports = {
  getDashboard: async (req, res) => {
    try {
      const invoices = await Invoice.find({ googleId: req.user.googleId }).sort(
        {
          startDate: -1,
        }
      );
      res.json({
        invoices: invoices,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
};
