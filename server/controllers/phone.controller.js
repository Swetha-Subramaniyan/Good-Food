const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getAllPhoneNumber = async (req,res) => {
    try {
        const getAllNumber = await prisma.phone_Number.findMany()
        res.status(200).json({message : "Phone NUmber fetched",getAllNumber})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No Phone Numbers fetched"})
    }
}

const createPhoneNumber = async (req, res) => {
    try {
      const { phone_number } = req.body;
      const {customer_id,user_id} = req.user;
  
      const createPhone = await prisma.phone_Number.create({
        data: {
          user_id,
          phone_number,
          customer_id , 
          created_at: new Date(),
        },
      });
  
      res.status(200).json({ message: "Created Phone Number", createPhone });
    } catch (error) {
      console.error("Error creating phone number:", error);
      res.status(500).json({ error: "Failed to create phone number" });
    }
  };
  
module.exports = {getAllPhoneNumber,createPhoneNumber}