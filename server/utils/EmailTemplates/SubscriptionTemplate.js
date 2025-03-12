const SubscriptionTemplateHTML = (
  name,
  plan,
  startDate,
  endDate,
  modifyUrl,
  addonsUrl
) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Subscription Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #E7E4E7;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        .header {
            background-color: #FFBD59;
            color: black;
            padding: 10px;
            font-size: 24px;
            border-radius: 10px 10px 0 0;
        }
        .content {
            font-size: 18px;
            color: #333;
            padding: 20px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px;
            color: white !important;
            background: #6B3859;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="header">🎉 Subscription Confirmed! 🎉</div>
        <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for subscribing to our <strong>${plan}</strong> meal plan! 🍽️</p>
            <p>Your subscription starts from <strong>${startDate}</strong> and ends on <strong>${endDate}</strong>.</p>
            <p>You can modify your plan anytime by clicking the button below:</p>
            <div style="text-align:center">
            <a href="${modifyUrl}" class="btn">Modify Plan</a>
            </div>
            <p>Looking to add some extras? Check out our delicious add-ons:</p>
             <div style="text-align:center">
            <a href="${addonsUrl}" class="btn" style="background: #6B3859;">View Add-ons</a>
            </div>
            <p>Enjoy your meals and let’s grow together! 🚀</p>
        </div>
        <div class="footer">© 2024 FoodApp | All rights reserved</div>
    </div>
</body>
</html>`;

module.exports = { SubscriptionTemplateHTML };
