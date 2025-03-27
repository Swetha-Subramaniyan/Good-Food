const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAdditionalFoodItems = async(req,res) => {
    try {
        const {food_item_id,is_additional} = req.body;
        const newFood = await prisma.additional_Itemss.create({
            data : {
                food_item_id,
                is_additional,
                created_at : new Date(),
                updatedAt : new Date()
            }
        })
        res.status(200).json({message : "Additional Food Items created",newFood})
    } catch (error) {
       console.log(error) 
       res.status(404).json({error : "No Food Items created"})
    }
}


const getAllAdditionalItems = async(req,res) => {
    try {
        const getAllItems = await prisma.additional_Itemss.findMany({
            select : {
                food_item_id : true,
                additionalItems : {
                    select : {
                        item_name : true,
                        image_url:true,
                        SubscriptionPriceDetails : {
                            select : {
                                id:true,
                                price:true
                            }
                        }
                    }
                }
            }
        })
        const foodItems = getAllItems.map(item => ({
            id: item.food_item_id,
            name: item.additionalItems.item_name,
            image_url : item.additionalItems.image_url,
            price:item.additionalItems.SubscriptionPriceDetails.price
          }));
      
        res.status(200).json({message : "Additional Items Fetched",foodItems})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No Items fetched"})
    }
}


module.exports = {createAdditionalFoodItems,getAllAdditionalItems}