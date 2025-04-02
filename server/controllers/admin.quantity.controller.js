const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    const quantityRecord = await prisma.quantity.create({
      data: {
        quantity: parseInt(quantity),
      },
    });
    
    res.status(201).json(quantityRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllQuantities = async (req, res) => {
  try {
    const quantities = await prisma.quantity.findMany();
    res.json(quantities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuantityById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const quantity = await prisma.quantity.findUnique({
      where: { id: parseInt(id) },
      include: {
        DurationSub: true,
      },
    });
    
    if (!quantity) {
      return res.status(404).json({ error: 'Quantity not found' });
    }
    
    res.json(quantity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    const updatedQuantity = await prisma.quantity.update({
      where: { id: parseInt(id) },
      data: {
        quantity: parseInt(quantity),
      },
    });
    
    res.json(updatedQuantity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.quantity.delete({
      where: { id: parseInt(id) },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createQuantity,
  getAllQuantities,
  getQuantityById,
  updateQuantity,
  deleteQuantity,
};