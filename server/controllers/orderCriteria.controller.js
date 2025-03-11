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

// Get all order criteria
const getOrderCriteria = async (req, res) => {
  try {
    const criteria = await prisma.order_Criteria.findMany();
    res.status(200).json({ message: 'Success', data: criteria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch order criteria' });
  }
};

// Create new order criteria
const createOrderCriteria = async (req, res) => {
  try {
    const { meal_type_id, parent_plan_id, order_time, cutoff_time } = req.body;

    if (!/^\d{2}:\d{2}$/.test(order_time) || !/^\d{2}:\d{2}$/.test(cutoff_time)) {
      return res.status(400).json({ error: 'Invalid time format. Use HH:mm.' });
    }

    const criteria = await prisma.order_Criteria.create({
      data: {
        meal_type_id: parseInt(meal_type_id),
        parent_plan_id: parseInt(parent_plan_id),
        order_time,
        cutoff_time,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({ message: 'Criteria created successfully', data: criteria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create criteria' });
  }
};

const checkOrderTiming = async (req, res) => {
  try {
    const { meal_type_id, parent_plan_id } = req.body;

    console.log('Received meal_type_id:', meal_type_id);
    console.log('Received parent_plan_id:', parent_plan_id);

    if (!meal_type_id || !parent_plan_id) {
      return res.status(400).json({ error: 'meal_type_id and parent_plan_id are required.' });
    }

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Calculate decimal time (e.g., 10:30 AM = 10.5)
    const currentDecimalTime = currentHour + currentMinute / 60;

    // Meal type mapping (adjust IDs as needed)
    const mealCutoffTimes = {
      1: { label: 'Breakfast', cutoffTime: 22 }, // 10:00 PM (previous day)
      2: { label: 'Lunch', cutoffTime: 9 },      // 9:00 AM (same day)
      3: { label: 'Dinner', cutoffTime: 17 },    // 4:00 PM (same day)
    };

    const meal = mealCutoffTimes[meal_type_id];
    if (!meal) {
      return res.status(404).json({ error: 'Invalid meal type.' });
    }

    // Find matching criteria
    const mealPlanCriteria = await prisma.order_Criteria.findFirst({
      where: {
        meal_type_id: parseInt(meal_type_id),
        parent_plan_id: parseInt(parent_plan_id),
      },
    });

    if (!mealPlanCriteria) {
      return res.status(404).json({ error: 'No criteria found for this meal type and plan.' });
    }

    let cutoffTimeDecimal;

    if (meal_type_id == 1) { // Breakfast (previous day's cutoff at 10 PM)
      const yesterday = new Date();
      yesterday.setDate(currentTime.getDate() - 1);
      cutoffTimeDecimal = meal.cutoffTime;
    } else { // Lunch or Dinner (same day cutoffs)
      cutoffTimeDecimal = meal.cutoffTime;
    }

    console.log(`Current Time: ${currentDecimalTime}`);
    console.log(`Cutoff Time for ${meal.label}: ${cutoffTimeDecimal}`);

    if (currentDecimalTime > cutoffTimeDecimal) {
      return res.json({ 
        isOrderAllowed: false, 
        message: `Cutoff time has passed. You can no longer order ${meal.label}.` 
      });
    }

    res.json({ 
      isOrderAllowed: true, 
      message: `You can still place an order for ${meal.label}!` 
    });

  } catch (error) {
    console.error('Error checking order timing:', error);
    res.status(500).json({ error: 'Failed to check order timing' });
  }
};

module.exports = {
  getOrderCriteria,
  createOrderCriteria,
  checkOrderTiming,
};


