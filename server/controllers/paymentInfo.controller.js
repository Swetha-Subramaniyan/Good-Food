// const express = require('express')
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();


// const getPaymentInfo = async(req,res) => {
//     try {
//         const {customer_id}=req.user;
//        const getPayment = await prisma.item_Payment.findMany({
//         where : {customer_id},
//         select : {
//             user_subscription_id:true,
//             payment_method:true,
//             payment_status:true,
//             payment_info:true,
//         }
//        }) 
//        res.status(200).json({messge : "Payment info fetched",getPayment})
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({error:"No Payment info fetched"})
//     }
// }

// const createPaymentInfo = async (req, res) => {
//     try {
//         const { payment_method, customer_id, user_subscription_id, payment_status, payment_info } = req.body;
    
//         // Store payment info in the Item_Payment table
//         const payment = await prisma.item_Payment.create({
//           data: {
//             payment_method,
//             customer_id,
//             user_subscription_id,
//             payment_status,
//             payment_info,
//             created_at: new Date(),
//             updatedAt: new Date(),
//           },
//         });
    
//         res.status(201).json({ message: "Payment info saved successfully", payment });
//       } catch (error) {
//         console.error("Error saving payment info:", error);
//         res.status(500).json({ message: "Failed to save payment info" });
//       }
//     };
    
// const confirmPayment = async (req, res) => {
//     try {
//         const { payment_id, order_id, status } = req.body;
//         const { customer_id } = req.user;

//         if (status !== "success") {
//             return res.status(400).json({ error: "Payment failed" });
//         }

//         // Find the existing payment entry
//         const existingPayment = await prisma.item_Payment.findFirst({
//             where: { customer_id, payment_info: { contains: order_id } },
//         });

//         if (!existingPayment) {
//             return res.status(404).json({ error: "No matching payment found" });
//         }

//         // Update the payment status in the database
//         const updatedPayment = await prisma.item_Payment.update({
//             where: { id: existingPayment.id },
//             data: { payment_status: "Active", payment_info: JSON.stringify({ payment_id, order_id, status }) },
//         });

//         res.status(200).json({ message: "Payment confirmed", updatedPayment });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };




// module.exports={getPaymentInfo,createPaymentInfo,confirmPayment}