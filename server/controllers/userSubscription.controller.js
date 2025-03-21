// const express = require('express')
// const {PrismaClient} = require('@prisma/client')
// const prisma = new PrismaClient();

// const getUserSubscription = async(req,res) => {
//   try {
//     const getSubscriptions = await prisma.user_Subscription.findMany({
//        select : {
//         user_id,
//         subscription_id,
//         start_date,
//         end_date
//        }
//     })
//     res.status(200).json({message : "User Subscriped", getSubscriptions})
//   } catch (error) {
//     console.log(error)
//     res.status(404).json({error : "No user subscriped"})
//   }
// }

// const createUserSubscription = async (req, res) => {
//   try {
//     const { subscription_id } = req.body;
//     const { user_id } = req.user;

//     const subscriptionDuration = await prisma.duration_qty.findUnique({
//       where: { id : subscription_id },
//       select: { days: true },
//     });

//     const days = subscriptionDuration.days;

//     const start_date = new Date();
//     const end_date = new Date(start_date);
//     end_date.setDate(start_date.getDate() + days);

//     console.log("Start Date:", start_date.toISOString().split("T")[0]);
//     console.log("End Date:", end_date.toISOString().split("T")[0]);

//     const createSubscription = await prisma.user_Subscription.create({
//       data: {
//         subscription_id,
//         start_date,
//         end_date,
//         status: "Pending",
//         user_id,
//         created_at: new Date(),
//         updatedAt: new Date(),
//       },
//     });

//     res.status(200).json({ message: "Subscription Created", createSubscription });
//   } catch (error) {
//     console.error("Error creating subscription:", error);
//     res.status(500).json({ error: error.message || "Subscription creation failed" });
//   }
// };

// module.exports = {getUserSubscription,createUserSubscription}

// const express = require('express')
// const {PrismaClient} = require('@prisma/client')
// const prisma = new PrismaClient();

// const getUserSubscription = async(req,res) => {
//   try {
//     const getSubscriptions = await prisma.user_Subscription.findMany()
//     res.status(200).json({message : "User Subscriped", getSubscriptions})
//   } catch (error) {
//     console.log(error)
//     res.status(404).json({error : "No user subscriped"})
//   }
// }

// const getUserSubscriptionDetails = async (req, res) => {
//   try {
//     const { customer_id } = req.user;
//     const userSubscriptions = await prisma.user_Subscription.findMany({
//       where: { customer_id },

//       include : {
//         Subscription : {
//           select : {
//             parentPlan1 : {select : { plan_name : true }},
//             DurationSub: {select: {quantity: true,}, },
//             DurationSubs: {
//                     select: {
//                       actual_days: true,
//                       addon_days: true,
//                     },
//                   },
//             MealSub : {select : {meal_type : true}},
//             PricingDetails : {select : {price : true}}
//           }
//         }
//       }
//     });

//    console.log("User Deatils" , userSubscriptions)

//     res.status(200).json({ message: "User Subscription Details fetched", userSubscriptions });
//   } catch (error) {
//     console.error("Error fetching user subscription details:", error);
//     res.status(500).json({ error: error.message || "Failed to fetch user subscription details" });
//   }
// };

// const getSubscriptionById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("Fetched Id :" , id)
//     const subscription = await prisma.subscription.findUnique({
//       where: { id: parseInt(id,10) },
//       include: {
//         DurationSub: { select : {quantity : true}},
//         DurationSubs: {
//           select : {
//           actual_days : true,
//           addon_days : true
//         }
//       },
//         MealSub: {select : {meal_type : true}},
//         PricingDetails: {select : {price : true}},
//       },
//     });

//     res.status(200).json({ message: 'Subscription details fetched', subscription });
//   } catch (error) {
//     console.error('Error fetching subscription by ID:', error);
//     res.status(500).json({ error: 'Failed to fetch subscription details' });
//   }
// };

// const createUserSubscription = async (req, res) => {
//   try {
//     const { subscription_id } = req.body;

//     const { customer_id } = req.user;
//     console.log("Subscription ID :", subscription_id);
//     const subscription = await prisma.subscription.findUnique({
//       where: {
//         id : subscription_id
//       },
//     });

//     const subscriptionData = await prisma.subscription.findMany({
//       where: { id: subscription.id },
//       include: {
//         DurationSub: {select: {quantity: true,},},
//         DurationSubs: {
//           select: {
//             actual_days: true,
//             addon_days: true,
//           },
//         },
//         MealSub : {select : {meal_type : true}},
//         PricingDetails : {select : {price : true}}
//       },
//     });

//     const durationSub = subscriptionData[0].DurationSub;
//     const durationSubs = subscriptionData[0].DurationSubs;

//     const quantity = durationSub?.quantity;
//     const actual_days = durationSubs?.actual_days;
//     const addon_days = durationSubs?.addon_days;

//     const validity = actual_days + addon_days;

//     const start_date = new Date();
//     const end_date = new Date(start_date);
//     end_date.setDate(start_date.getDate() + quantity);

//     console.log("Start Date:", start_date.toISOString().split("T")[0]);
//     console.log("End Date:", end_date.toISOString().split("T")[0]);
//     console.log("Validity Days:", validity);

//     const createSubscription = await prisma.user_Subscription.create({
//       data: {
//         subscription_id : subscription.id,
//         start_date,
//         end_date,
//         status: "Pending",
//         customer_id,
//         validity_days: validity,
//         created_at: new Date(),
//         updatedAt: new Date(),
//       },
//     });
// console.log("Creation of Sub",createSubscription)
//     res.status(200).json({ message: "Subscription Created : ", createSubscription });
//   } catch (error) {
//     console.error("Error creating subscription:", error);
//     res.status(500).json({ error: error.message || "Subscription creation failed" });
//   }
// };

// module.exports = {getUserSubscription,getSubscriptionById,getUserSubscriptionDetails,createUserSubscription}

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserSubscription = async (req, res) => {
  try {
    const getSubscriptions = await prisma.user_Subscription.findMany();
    res.status(200).json({ message: "User Subscriped", getSubscriptions });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "No user subscriped" });
  }
};

const getUserSubscriptionDetails = async (req, res) => {
  try {
    const { customer_id } = req.user;
    const userSubscriptions = await prisma.user_Subscription.findMany({
      where: { customer_id },

      include: {
        Subscription: {
          select: {
            parentPlan1: { select: { plan_name: true } },
            DurationSub: { select: { quantity: true } },
            DurationSubs: {
              select: {
                actual_days: true,
                addon_days: true,
              },
            },
            MealSub: { select: { meal_type: true } },
            PricingDetails: { select: { price: true } },
            TierSub: { select: { type: true } },
          },
        },
      },
    });

    console.log("User Deatils", userSubscriptions);

    res.status(200).json({
      message: "User Subscription Details fetched",
      userSubscriptions,
    });
  } catch (error) {
    console.error("Error fetching user subscription details:", error);
    res.status(500).json({
      error: error.message || "Failed to fetch user subscription details",
    });
  }
};
const getMenuWithSubID = async (req, res) => {
  try {
    
    const { id } = req.params;
    const getFood = await prisma.user_Subscription.findMany({
      where: { id : parseInt(id) },
      select: {
        subscription_id : true,
        Subscription : {
          select : {
            meal_type_id:true,
            FoodSubscription : {
              select : {
                FoodItems : {
                  select : {
                    id:true,
                    item_name : true,
                    price_id:true,
                    SubscriptionPriceDetails : {
                      select : {
                        price:true 
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
    });

    const transformedData = getFood.map((item) => ({
      subscription_id: item.subscription_id,
      meal_type_id:item.Subscription.meal_type_id,
      FoodItems: item.Subscription.FoodSubscription.map((fs) => ({
        id: fs.FoodItems.id,
        item_name: fs.FoodItems.item_name,
        price_id: fs.FoodItems.price_id,
        price: fs.FoodItems.SubscriptionPriceDetails?.price || null,
      })),
    }));

    res.status(200).json({ message: "Fetched successfully", data: transformedData });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "FAiled to fetch the food items" });
  }
};

// const createUserSubscription = async (req, res) => {
//   try {
//     const { subscription_id } = req.body;

//     const { customer_id } = req.user;
//     console.log("Subscription ID :", subscription_id);
//     const subscription = await prisma.subscription.findUnique({
//       where: {
//         id: Number(subscription_id),
//       },
//     });

//     const subscriptionData = await prisma.subscription.findMany({
//       where: { id: subscription.id },
//       include: {
//         DurationSub: { select: { quantity: true } },
//         DurationSubs: {
//           select: {
//             actual_days: true,
//             addon_days: true,
//           },
//         },
//         MealSub: { select: { meal_type: true } },
//         PricingDetails: { select: { price: true } },
//       },
//     });

//     const durationSub = subscriptionData[0].DurationSub;
//     const durationSubs = subscriptionData[0].DurationSubs;

//     const quantity = durationSub?.quantity;
//     const actual_days = durationSubs?.actual_days;
//     const addon_days = durationSubs?.addon_days;

//     const validity = actual_days + addon_days;

//     const start_date = new Date();
//     const end_date = new Date(start_date);
//     end_date.setDate(start_date.getDate() + quantity);

//     console.log("Start Date:", start_date.toISOString().split("T")[0]);
//     console.log("End Date:", end_date.toISOString().split("T")[0]);
//     console.log("Validity Days:", validity);
//     console.log("Customer_ID", customer_id);
//     const createSubscription = await prisma.user_Subscription.create({
//       data: {
//         subscription_id: subscription.id,
//         start_date,
//         end_date,
//         status: "Pending",
//         customer_id,
//         validity_days: validity,
//         created_at: new Date(),
//         updatedAt: new Date(),
//       },
//     });
//     res
//       .status(200)
//       .json({ message: "Subscription Created : ", createSubscription });
//   } catch (error) {
//     console.error("Error creating subscription:", error);
//     res
//       .status(500)
//       .json({ error: error.message || "Subscription creation failed" });
//   }
// };

module.exports = {
  getUserSubscription,
  getUserSubscriptionDetails,
  getMenuWithSubID,
  // createUserSubscription,
};
