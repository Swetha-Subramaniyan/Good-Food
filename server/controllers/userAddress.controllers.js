// const { PrismaClient } = require('@prisma/client');
// const express = require('express')
// const prisma = new PrismaClient();


// const getPhoneNumber = async (req,res) => {
//     try {
//       const getPhone = await prisma.user_Address.findMany()
//       res.status(200).json(getPhone)  
//     } catch (error) {
//         console.log(error)
//     }
// }

// const createPhoneNumber = async (req,res) => {
//     try {
//         const {name,email,phone_number,landmark,street,city,pincode,alternate_number}=req.body;
//         const{customer_id} = req.user;
// const createPhone = await prisma.user_Address.create({
//     data : {
//         name,
//         customer_id,
//         email,
//         phone_number,
//         alternate_number,
//         landmark,
//         street,
//         city,
//         pincode,
//         created_at : new Date(),
//         updatedAt : new Date()
//     }
// })
// res.status(200).json({message : "Success",createPhone})
//     } catch (error) {
//         console.log(error)
//     }
// }


// module.exports = {getPhoneNumber,createPhoneNumber}








const { PrismaClient } = require('@prisma/client');
const express = require('express')
const prisma = new PrismaClient();
 
 
const getPhoneNumber = async (req,res) => {
    try {
    const {customer_id} = req.user;
      const getPhone = await prisma.users.findMany({
        where : {customer_id},
        select : {
            userAddress : true,
            userSubscription : {
                select : {
                    subscription_id : true,
                    start_date : true,
                    end_date:true,
                    status : true,
                    validity_days : true,
                    Subscription : {
                        select : {
                            parentPlan1 : {select : {plan_name : true}},
                            TierSub : {select : {type : true}},
                            MealSub : {select : {meal_type : true}},
                            DurationSubs : {
                                select : {
                                    actual_days : true,
                                    addon_days : true
                                }
                            },
                            PricingDetails : {select : {price : true}}
                        }
                    }
                }
            }

        }
      })
      res.status(200).json(getPhone)  
    } catch (error) {
        console.log(error)
    }
}


const createAddress = async (req, res) => {
    try {
        console.log("ss", req.body)
        const { name, email, phone_number, alternate_number, addresses } = req.body;
        const { customer_id } = req.user;

        const addressData = addresses.map(addr => ({
            name,
            customer_id,
            email,
            phone_number,
            alternate_number,
            landmark: addr.landmark,
            street: addr.street,
            city: addr.city,
            pincode: addr.pincode,
            created_at: new Date(),
            updatedAt: new Date(),
        }));

 
        const createPhone = await prisma.user_Address.create({
            data: addressData[0]
        });
 
        res.status(200).json({ message: "Success", createPhone });
 

    } catch (error) {
        console.error("Error inserting addresses:", error);
        res.status(500).json({ error: "Failed to create addresses" });
    }
};


module.exports = {getPhoneNumber,createAddress}