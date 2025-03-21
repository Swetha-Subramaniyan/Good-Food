const { PrismaClient } = require("@prisma/client");

const express = require("express");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const user = await prisma.users.findMany();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const getCustomerID = async (req, res) => {
  try {
    const { customer_id } = req.user;

    if (!customer_id) {
      return res.status(400).json({ error: "Customer ID not found in token." });
    }

    const getID = await prisma.users.findMany({
      where: {
        customer_id,
      },
      select: {
        customer_id: true,
      },
    });

    if (!getID.length) {
      return res
        .status(404)
        .json({ error: "Customer ID not found in the database." });
    }

    res.status(200).json({ message: "ID fetched", getID });
  } catch (error) {
    console.error("Error fetching customer ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUsers = async (req, res) => {
  const { username, email, display_picture } = req.body;

  try {
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        display_picture,
        created_at: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

// const getUserAddress = async(req,res) => {
//   try {
//       const {customer_id } =req.user;
//       const getUser = await prisma.users.findMany({
//         where : {customer_id},

//         select : {

//           userSubscription : {
//             select : {
//               subscription_id:true,
//               start_date : true,
//               end_date : true,
//               status : true,
//               validity_days : true,

//               Subscription : {
//                 select : {
//                   parentPlan1 : {
//                     select : {plan_name : true}, },
//                     TierSub : {select : {type : true}},
//                     MealSub : {select : {meal_type : true}},
//                     PricingDetails : {select : {price : true}},
//                 }
//               },

//             },

//           },
//           userAddress : {
//             select : {
//               name : true,
//               email : true,
//               phone_number : true,
//               landmark : true,
//               street : true,
//               city : true,
//               pincode : true,
//             }
//           },

//         }
//       })
//       res.status(200).json({message : "User Address",getUser})
//   } catch (error) {
//       console.log(error)
//       res.status(404).json({error : "No Address fetched"})
//   }
// }

const getUserAddress = async (req, res) => {
  try {
    const { customer_id } = req.user;
    const getUser = await prisma.users.findMany({
      where: { customer_id },
      select: {
        userSubscription: {
          select: {
            subscription_id: true,
            start_date: true,
            end_date: true,
            status: true,
            validity_days: true,

            Subscription: {
              select: {
                parentPlan1: { select: { plan_name: true } },
                TierSub: { select: { type: true } },
                MealSub: { select: { meal_type: true } },
                PricingDetails: { select: { price: true } },
              },
            },
          },
        },
        userAddress: {
          select: {
            name: true,
            email: true,
            phone_number: true,
            alternate_number: true,
            landmark: true,
            street: true,
            city: true,
            pincode: true,
          },
        },
      },
    });

    const formattedUser = getUser.map((user) => ({
      ...user,
      userSubscription: user.userSubscription.map((sub) => ({
        plan_name: sub.Subscription?.parentPlan1?.plan_name || null,
        type: sub.Subscription?.TierSub?.type || null,
        meal_type: sub.Subscription?.MealSub?.meal_type || null,
        price: sub.Subscription?.PricingDetails?.price || null,
        subscription_id: sub.subscription_id,
        start_date: sub.start_date,
        end_date: sub.end_date,
        status: sub.status,
        validity_days: sub.validity_days,
      })),
    }));

    res.status(200).json({
      message: "User Address & Subscription Details",
      getUser: formattedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "No Address or Subscription fetched" });
  }
};



module.exports = {
  getAllUsers,
  getCustomerID,
  createUsers,
  getUserAddress,
};
