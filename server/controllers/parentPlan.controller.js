const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getParentPlans = async (req, res) => {
    try {
      const parentPlans = await prisma.parent_Plan.findMany();
  
      res.status(200).json({message : "fetched success",parentPlans});
    } catch (error) {
      console.error('Error fetching parent plans:', error);
      res.status(500).json({ error: 'Failed to fetch parent plans' });
    }
  };

const createParentPlan = async (req, res) => {
    try {
      const { plan_name} = req.body;
  
      const parentPlan = await prisma.parent_Plan.create({
        data: {
          plan_name
        },
      });
  
      res.status(201).json( { message : "Parent plan created ",parentPlan});
    } catch (error) {
      console.error('Error creating parent plan:', error);
      res.status(500).json({ error: 'Failed to create parent plan' });
    }
  };
  
  module.exports = {getParentPlans,createParentPlan}
  