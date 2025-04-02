const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createParentPlan = async (req, res) => {
  try {
    const { plan_name } = req.body;
    
    const parentPlan = await prisma.parent_Plan.create({
      data: {
        plan_name,
      },
    });
    
    res.status(201).json(parentPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllParentPlans = async (req, res) => {
  try {
    const parentPlans = await prisma.parent_Plan.findMany();
    res.json(parentPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getParentPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const parentPlan = await prisma.parent_Plan.findUnique({
      where: { id: parseInt(id) },
      include: {
        subscriptions: true,
        orderCriteria: true,
      },
    });
    
    if (!parentPlan) {
      return res.status(404).json({ error: 'Parent plan not found' });
    }
    
    res.json(parentPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateParentPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan_name } = req.body;
    
    const updatedParentPlan = await prisma.parent_Plan.update({
      where: { id: parseInt(id) },
      data: {
        plan_name,
      },
    });
    
    res.json(updatedParentPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteParentPlan = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.parent_Plan.delete({
      where: { id: parseInt(id) },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createParentPlan,
  getAllParentPlans,
  getParentPlanById,
  updateParentPlan,
  deleteParentPlan,
};