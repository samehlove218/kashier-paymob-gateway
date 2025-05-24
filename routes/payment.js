const express = require('express');
const axios = require('axios');
const router = express.Router();

// Handle payments
router.post('/', async (req, res) => {
  const { amount, currency, source } = req.body;

  try {
    if (source === 'kashier') {
      const response = await axios.post('https://api.kashier.io/v1/payments', {
        merchantId: process.env.MERCHANT_ID,
        token: process.env.KASHIER_TOKEN,
        amount,
        currency
      });
      return res.json(response.data);
    } else if (source === 'paymob') {
      const response = await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', {
        api_key: process.env.PAYMOB_TOKEN,
        amount_cents: amount * 100,
        currency,
        expiration: 3600,
        billing_data: {
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          phone_number: "+201234567890",
          apartment: "NA",
          floor: "NA",
          street: "NA",
          building: "NA",
          city: "Cairo",
          country: "EG"
        }
      });
      return res.json(response.data);
    } else {
      return res.status(400).json({ error: 'Invalid source' });
    }
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    return res.status(500).json({ error: 'Payment processing failed' });
  }
});

module.exports = router;
