const FoodProcessingUserTemplateHTML = (
    name,
  plan,
  startDate,
  endDate,
  todayMealDate,
  mealType,
  mealItems,
  modifyUrl,
  skipMealUrl
) => `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Your Meal is Being Prepared!</title>
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
          .meal-box {
              background: #f8f8f8;
              padding: 15px;
              border-radius: 10px;
              text-align: left;
              margin-top: 15px;
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
          .warning {
              font-size: 16px;
              color: red;
              margin-top: 15px;
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
          <div class="header">🍽️ Your Meal is Being Prepared! 🍽️</div>
          <div class="content">
              <p>Hi <strong> ${name} </strong>,</p>
              <p>We are happy to inform you that your meal for <strong>${todayMealDate}</strong> is now being prepared! 🚀</p>
              
              <div class="meal-box">
                  <p><strong>Subscription Plan:</strong> ${plan}</p>
                  <p><strong>Subscription Period:</strong> ${startDate} - ${endDate}</p>
                  <p><strong>Meal Type:</strong> ${mealType}</p>
                  <p><strong>Today's Meal Includes:</strong></p>
                  <ul>
                      ${mealItems.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
              </div>
  
              <p>Your meal will be delivered soon! We hope you enjoy your food. 😋</p>
              
              <div class="warning">
                  <p>🔴 Please Note:</p>
                  <p>Meals for today cannot be canceled. However, you can skip future meals if needed.</p>
                  <p>No refunds will be provided for skipped meals.</p>
              </div>
              
              <div style="text-align:center">
                  <a href="${skipMealUrl}" class="btn" style="background: #FF5733;">Skip Future Meals</a>
                  <a href="${modifyUrl}" class="btn">Modify Subscription</a>
              </div>
  
              <p>Thank you for choosing us! Enjoy your meal and stay healthy! 🥗</p>
          </div>
          <div class="footer">© 2024 FoodApp | All rights reserved</div>
      </div>
  </body>
  </html>`;

module.exports = { FoodProcessingUserTemplateHTML };
