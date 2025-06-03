const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// ✅ هذا هو رابط ngrok الفعلي من جهازك
const LOCAL_N8N_WEBHOOK_URL = 'https://0a9b-197-202-47-209.ngrok-free.app/webhook';


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

// ⚠️ Render يستخدم هذا المنفذ
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ الخادم يعمل على المنفذ ${PORT}`);
});
