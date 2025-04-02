const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createMealType = async (req, res) => {
  try {
    const { meal_type } = req.body;
    
    const mealType = await prisma.meal_type.create({
      data: {
        meal_type,
      },
    });
    
    res.status(201).json(mealType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllMealTypes = async (req, res) => {
  try {
    const mealTypes = await prisma.meal_type.findMany();
    res.json(mealTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMealTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const mealType = await prisma.meal_type.findUnique({
      where: { id: parseInt(id) },
      include: {
        MealSub: true,
        MealOrder: true,
        MealOrderss: true,
        subFoodMenu: true,
        skippedMealItem: true,
      },
    });
    
    if (!mealType) {
      return res.status(404).json({ error: 'Meal type not found' });
    }
    
    res.json(mealType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMealType = async (req, res) => {
  try {
    const { id } = req.params;
    const { meal_type } = req.body;
    
    const updatedMealType = await prisma.meal_type.update({
      where: { id: parseInt(id) },
      data: {
        meal_type,
      },
    });
    
    res.json(updatedMealType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMealType = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.meal_type.delete({
      where: { id: parseInt(id) },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMealType,
  getAllMealTypes,
  getMealTypeById,
  updateMealType,
  deleteMealType,
};