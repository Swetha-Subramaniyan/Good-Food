const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getTier = async(req,res) => {
    try {
       const fetchTier = await prisma.tier.findMany()
       res.status(200).json({message : "Tier fetched ", fetchTier}) 
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No tier fetched"})
    }
}

const createTier = async(req,res) => {
    try {
        const {type} = req.body;
        const newTier = await prisma.tier.create({
            data : {
                type,
                created_at : new Date(),
                updatedAt : new Date()
            }
        })
        res.status(200).json({message : "Tier created",newTier})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No tier created "})
    }
}

module.exports = {getTier,createTier}