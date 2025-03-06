// const express = require('express')
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();


// const getOrderCriteria = async(req,res) => {
//     try {
//         const getCriteria = await prisma.order_Criteria.findMany()
//         res.status(200).json({message : "Success",getCriteria})
//     } catch (error) {
//       console.log(error)
//       res.status(404).json({error : "No Items Fetched "})  
//     }
// }

// const createOrderCriteria = async(req,res) => {
//     try {
//         const {meal_type_id,order_time,cutoff_time} = req.body;
//         const newCriteria = await prisma.order_Criteria.create({
//             data : {
//                 meal_type_id,
//                 order_time,
//                 cutoff_time,
//                 created_at : new Date(),
//                 updatedAt : new Date()
//             }
//         })
//         res.status(200).json({message : "Sucess",newCriteria})
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({message : "No items created"})
//     }
// }

// module.exports = {getOrderCriteria,createOrderCriteria}






const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


  

// Get all meal time criteria
const getOrderCriteria = async (req, res) => {
  try {
    const criteria = await prisma.order_Criteria.findMany();
    res.status(200).json({ message: "Success", data: criteria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch order criteria" });
  }
};



const createOrderCriteria = async (req, res) => {
  try {
    const { meal_type_id, parent_plan_id,order_time, cutoff_time } = req.body;

    // Validate time format (basic check for HH:mm)
    if (!/^\d{2}:\d{2}$/.test(order_time) || !/^\d{2}:\d{2}$/.test(cutoff_time)) {
      return res.status(400).json({ error: "Invalid time format. Use HH:mm." });
    }

    const criteria = await prisma.order_Criteria.create({
      data: {
        parent_plan_id,
        meal_type_id: parseInt(meal_type_id),
        order_time: order_time, // store time as string
        cutoff_time: cutoff_time, // store time as string
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({ message: "Criteria created successfully", data: criteria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create criteria" });
  }
};


const validateOrderTime = async (meal_type_id) => {
  try {
    console.log("Meal_TYPE_ID:", meal_type_id);

    // Get current time in decimal hours (e.g., 16.5 for 4:30 PM)
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;

    // Define meal type cutoffs (modify meal_type_id values based on your DB)
    const mealCutoffTimes = {
      1: 22.00, // Breakfast (10 PM previous night)
      2: 9.00,  // Lunch (9 AM same day)
      3: 16.00  // Dinner (4 PM same day)
    };

    // Check if meal_type_id exists in the defined cutoffs
    if (!mealCutoffTimes[meal_type_id]) {
      throw new Error("Invalid meal type.");
    }

    const cutoffHour = mealCutoffTimes[meal_type_id];

    console.log(`Current Time: ${currentHour.toFixed(2)}`);
    console.log(`Order Cutoff Time: ${cutoffHour.toFixed(2)}`);

    // Validate order time
    if (currentHour > cutoffHour) {
      throw new Error(
        `Ordering for this meal type is closed. You must order before ${cutoffHour < 12 ? cutoffHour + ' AM' : (cutoffHour - 12) + ' PM'}.`
      );
    }

    console.log("Order is allowed.");
    return true;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};



  

module.exports = {
  getOrderCriteria,
  createOrderCriteria,
  validateOrderTime,
};



