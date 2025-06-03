const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// هذا الرابط سيكون لاحقًا رابط ngrok الخاص بـ n8n
const LOCAL_N8N_WEBHOOK_URL = 'https://abc123.ngrok.io/webhook'; // ← سنعدّله لاحقًا

app.post('/webhook', async (req, res) => {
  try {
    console.log('رسالة من Telegram:', req.body);

    // إرسال الرسالة إلى n8n
    await axios.post(LOCAL_N8N_WEBHOOK_URL, req.body);

    res.status(200).send('تم التوجيه إلى n8n');
  } catch (err) {
    console.error('خطأ:', err.message);
    res.status(500).send('خطأ');
  }
});

app.get('/', (req, res) => {
  res.send('البوت شغال ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
