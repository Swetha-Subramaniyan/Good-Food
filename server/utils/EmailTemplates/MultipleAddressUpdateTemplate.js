const MultipleAddressUpdateTemplateHTML = (
) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Address Successfully Added</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f8f8;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            background: #ffffff;
            margin: auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h2 {
            color: #FFBD59;
        }

        p {
            color: #333;
            font-size: 16px;
        }

        .address-box {
            background: #f1f1f1;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            text-align: left;
        }

        .btn {
            display: inline-block;
            background-color: #FFBD59;
            color: #ffffff !important;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 10px;
        }

        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>New Address Added Successfully!</h2>
        <p>You have successfully added a new delivery address to your account. Here’s a summary of your saved addresses:</p>

        <!-- Example Address Blocks -->
        <div class="address-box">
            <strong>Home Address:</strong>
            <p>123 Main Street, Cityville, State, 12345</p>
        </div>

        <div class="address-box">
            <strong>Work Address:</strong>
            <p>456 Business Road, Office Park, State, 67890</p>
        </div>

        <p>You can manage or update your saved addresses at any time.</p>
        
        <a href="https://yourwebsite.com/manage-addresses" class="btn">Manage Addresses</a>
    </div>
</body>

</html>

`;

module.exports = { MultipleAddressUpdateTemplateHTML };
