const { PrismaClient } = require('@prisma/client');
const express = require('express')
const prisma = new PrismaClient();


const getPhoneNumber = async (req,res) => {
    try {
      const getPhone = await prisma.user_Address.findMany()
      res.status(200).json(getPhone)  
    } catch (error) {
        console.log(error)
    }
}

const createPhoneNumber = async (req,res) => {
    try {
        const {address,city,street,area,landmark,pincode,phone,alternate_phone,user_details_id}=req.body;
const createPhone = await prisma.user_Address.create({
    data : {
        address,
        city,
        street,
        area,
        landmark,
        pincode,
        phone,
        alternate_phone,
        user_details_id,
        created_at : new Date(),
        updatedAt : new Date()
    }
})
res.status(200).json({message : "Success",createPhone})
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getPhoneNumber,createPhoneNumber}