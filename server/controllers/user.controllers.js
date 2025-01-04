const { PrismaClient } = require('@prisma/client');

const express = require('express')
const prisma = new PrismaClient();

const getAllUsers = async (req,res) => {
    try {
        const user = await prisma.users.findMany()
        res.status(200).json(user)
    } catch (error) {
       console. log(error);
    }
}

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
        return res.status(404).json({ error: "Customer ID not found in the database." });
      }
  
      res.status(200).json({ message: "ID fetched", getID });
    } catch (error) {
      console.error("Error fetching customer ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  



const createUsers = async(req,res) => {

    const {username,email,display_picture} = req.body;

    try {
        const newUser = await prisma.users.create({
            data : {
                username,
                email,
                display_picture,
                created_at : new Date(),
                updatedAt : new Date()
            }
            
            
        })
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {getAllUsers,getCustomerID,createUsers}
