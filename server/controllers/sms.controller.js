const { Vonage } = require('@vonage/server-sdk');
require('dotenv').config();

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
});

exports.sendSMS = async (req, res) => {
    const { to, text } = req.body;
    const from = "Good Food";
    console.log(req.body)

    if (!to || !text) {
        return res.status(400).json({ message: "Recipient number and message text are required" });
    }

    try {
        const response = await vonage.sms.send({ to, from, text });
        console.log('Message sent successfully', response);
        res.status(200).json({ message: "SMS sent successfully", response });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ message: "Failed to send SMS", error });
    }
};
