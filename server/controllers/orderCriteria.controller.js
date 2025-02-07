const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getOrderCriteria = async(req,res) => {
    try {
        const getCriteria = await prisma.order_Criteria.findMany()
        res.status(200).json({message : "Success",getCriteria})
    } catch (error) {
      console.log(error)
      res.status(404).json({error : "No Items Fetched "})  
    }
}

const createOrderCriteria = async(req,res) => {
    try {
        const {meal_type_id,order_time,cutoff_time} = req.body;
        const newCriteria = await prisma.order_Criteria.create({
            data : {
                meal_type_id,
                order_time,
                cutoff_time,
                created_at : new Date(),
                updatedAt : new Date()
            }
        })
        res.status(200).json({message : "Sucess",newCriteria})
    } catch (error) {
        console.log(error)
        res.status(404).json({message : "No items created"})
    }
}

module.exports = {getOrderCriteria,createOrderCriteria}