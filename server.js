const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const LOCAL_N8N_WEBHOOK_URL = 'https://<رابط-ngrok>/webhook'; // ← عدّله لاحقًا

app.post('/webhook', async (req, res) => {
  console.log('رسالة من Telegram:', req.body);
  try {
    await axios.post(LOCAL_N8N_WEBHOOK_URL, req.body);
    res.status(200).send('OK');
  } catch (error) {
    console.error('خطأ في التوجيه إلى n8n:', error.message);
    res.status(500).send('Error forwarding to n8n');
  }
});

app.get('/', (req, res) => {
  res.send('✅ Webhook Relay Server is running!');
});

// ⚠️ مهم: استخدم هذا المنفذ الذي تطلبه Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ الخادم يعمل على المنفذ ${PORT}`);
});

