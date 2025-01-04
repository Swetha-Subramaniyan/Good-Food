const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getDurationQuty = async(req,res) => {
    try {
        const getQty = await prisma.duration_qty.findMany()
        res.status(400).json({message : "Success",getQty})
    } catch (error) {
        console.log(error)
        resizeBy.status(404).json({error : "Quantity not available "})
    }
}

const createDurationQty = async(req,res) => {
    try {
        const{days} = req.body
       const newQty = await prisma.duration_qty.create({
        data : {
            days,
            created_at : new Date(),
            updatedAt : new Date()
        }
       }) 
       res.status(200).json({message : "Days Added",newQty})
    } catch (error) {
       console.log(error)
       res.status(404).json({error : "No days added "}) 
    }
}


module.exports = {getDurationQuty,createDurationQty}