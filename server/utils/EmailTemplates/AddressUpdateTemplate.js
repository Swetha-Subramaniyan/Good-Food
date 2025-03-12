const AddressUpdateTemplateHTML = (
  ) => `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Address Update Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            color: #FFBD59;
            font-size: 22px;
            font-weight: bold;
        }
        .message {
            font-size: 16px;
            color: #333;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFBD59;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            font-size: 14px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Address Successfully Updated!</div>
        <p class="message">Your delivery address has been successfully updated. All future deliveries will be sent to your new address.</p>
        <a href="#" class="button">View Address</a>
        <div class="footer">If you did not make this change, please contact our support team immediately.</div>
    </div>
</body>
</html>
`;
  
  module.exports = { AddressUpdateTemplateHTML };
  