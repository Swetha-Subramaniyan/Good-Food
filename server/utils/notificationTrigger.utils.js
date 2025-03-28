const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { EmailTransmitter } = require("../utils/nodemailer.utils");

require("dotenv").config();

const notificationTrigger = async ({
  user_id,
  customer_id,
  entity_type,
  entity_id,
  email,
  emailSubject,
  emailTemplate,
  whatsappMessage,
  whatsappNumber,
  notificationDescription,
}) => {
  // Until the admin side is implemented, the first member who logs in as an admin is considered the one who triggered this notification.
  const adminId = 1;

  // Until the admin side is implemented, the Notification is triggered by User by default.
  const notifierType = "User";

  try {
    const notificationDetails = await prisma.Notication_Details.create({
      data: {
        entity_type: entity_type,
        entity_id: entity_id,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });

    const notification = await prisma.notification.create({
      data: {
        user_id: user_id,
        admin_id: adminId,
        notifier_type: notifierType,
        notofication_description: notificationDescription,
        notification_details_id: notificationDetails.id,
        created_at: new Date(),
        updatedAt: new Date(),
        customer_id: customer_id,
      },
    });

    console.log("Notification Created:", notification);

    let notification_status;

    if (email && emailSubject && emailTemplate) {
      await EmailTransmitter(email, emailSubject, emailTemplate);
      console.log("Email Sent Successfully");
      notification_status = "Sent";
    }

    notification_status = "Failed"
    
    await prisma.Notification_Response.create({
      data: {
        notification_id: notification.id,
        notification_status,
        notification_type_id: 1,
        send_at: new Date(),
        createdAt: new Date(),
        updateAt: new Date(),
      },
    });

    /* if (whatsappMessage) {
      const nexmoResponse = await axios.post(
        "https://messages-sandbox.nexmo.com/v1/messages",
        {
          from: process.env.VONAGE_WHATSAPP_TO_NUMBER,
          to: whatsappNumber,
          message_type: process.env.VONAGE_MESSAGE_TYPE,
          text: whatsappMessage,
          channel: process.env.VONAGE_CHANNEL,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          auth: {
            username: process.env.VONAGE_WHATSAPP_USERNAME,
            password: process.env.VONAGE_WHATSAPP_PASSWORD,
          },
        }
      );

      console.log("WhatsApp Notification Sent:", nexmoResponse.data);
    } */

    return { success: true };
  } catch (error) {
    console.error("Error in sendNotification Utility:", error);
    throw error;
  }
};

module.exports = notificationTrigger;
