require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// عرض رسالة في حالة GET على /pay (مفيد للمتصفح)
app.get('/pay', (req, res) => {
  res.send('Kashier Payment API is running. Use POST to submit payment.');
});

// المعالجة الفعلية لطلبات الدفع
app.post('/pay', async (req, res) => {
  const { amount, currency, orderId, customer } = req.body;

  if (!amount || !currency || !orderId || !customer) {
    return res.status(400).json({ error: 'Missing required payment fields.' });
  }

  const payload = {
    amount,
    currency,
    orderId,
    customer,
    merchantId: process.env.KASHIER_MERCHANT_ID,
    signature: process.env.KASHIER_SIGNATURE,
    returnUrl: customer.callbackUrl,
    paymentType: 'card'
  };

  try {
    const response = await axios.post('https://api.kashier.io/payment', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KASHIER_TOKEN}`
      }
    });

    res.status(200).json({ message: 'Payment initiated', data: response.data });
  } catch (error) {
    res.status(500).json({
      error: 'Payment failed',
      details: error.response?.data || error.message
    });
  }
});

// إعداد البورت (محلي أو من Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Kashier Payment API running on port ${PORT}`);
});
