const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createFoodItem = async (req, res) => {
  try {
    console.log("req.boy", req.body, req.file);
    const { item_name, item_type, description, price } = req.body;

    const image_url = req.file ? req.file.filename : null;

    const pricingDetails = await prisma.pricing_Details.create({
      data: {
        price: parseFloat(price),
      },
    });

    const foodItem = await prisma.food_Items.create({
      data: {
        item_name,
        item_type,
        description,
        price_id: pricingDetails.id,
        image_url,
      },
    });

    res.status(201).json(foodItem);
  } catch (error) {
    if (req.file) {
      const fs = require("fs");
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
};

const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await prisma.food_Items.findMany({
      include: {
        SubscriptionPriceDetails: true,
        FoodItemsMenu: true,
        FoodItemsCart: true,
        additionalItems: true,
        orderItems: true,
      },
    });
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFoodItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const foodItem = await prisma.food_Items.findUnique({
      where: { id: parseInt(id) },
      include: {
        SubscriptionPriceDetails: true,
        FoodItemsMenu: true,
        FoodItemsCart: true,
        additionalItems: true,
        orderItems: true,
      },
    });

    if (!foodItem) {
      return res.status(404).json({ error: "Food item not found" });
    }

    res.json(foodItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFoodItem = async (req, res) => {
  try {
    console.log("req.boy", req.body, req.file);

    const { id } = req.params;
    const { item_name, item_type, description, price } = req.body;
    const image_url = req.file ? req.file.filename : null;

    const foodItem = await prisma.food_Items.findUnique({
      where: { id: parseInt(id) },
    });

    if (!foodItem) {
      return res.status(404).json({ error: "Food item not found" });
    }

    const pricingDetails = await prisma.pricing_Details.update({
      where: { id: foodItem.price_id },
      data: {
        price: parseFloat(price),
      },
    });

    const updatedFoodItem = await prisma.food_Items.update({
      where: { id: parseInt(id) },
      data: {
        item_name,
        item_type,
        description,
        price_id: pricingDetails.id,
        image_url,
      },
    });

    res.json(updatedFoodItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;

    const foodItem = await prisma.food_Items.findUnique({
      where: { id: parseInt(id) },
    });

    if (!foodItem) {
      return res.status(404).json({ error: "Food item not found" });
    }

    await prisma.food_Items.delete({
      where: { id: parseInt(id) },
    });

    await prisma.pricing_Details.delete({
      where: { id: foodItem.price_id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFoodItem,
  getAllFoodItems,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
};
