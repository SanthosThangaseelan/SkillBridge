const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const FROM = "whatsapp:+14155238886"; // ✅ Twilio Sandbox WhatsApp

async function sendWhatsAppMessage(toPhone, message) {
  try {
    await client.messages.create({
      from: FROM,
      to: `whatsapp:+91${toPhone}`,
      body: message,
    });
    console.log("✅ WhatsApp sent to", toPhone);
  } catch (err) {
    console.error("❌ WhatsApp failed:", err.message);
  }
}

module.exports = { sendWhatsAppMessage };
