const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTier = async (req, res) => {
  try {
    const { type } = req.body;
    
    const tier = await prisma.tier.create({
      data: {
        type,
      },
    });
    
    res.status(201).json(tier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTiers = async (req, res) => {
  try {
    const tiers = await prisma.tier.findMany();
    res.json(tiers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTierById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const tier = await prisma.tier.findUnique({
      where: { id: parseInt(id) },
      include: {
        TierSub: true,
      },
    });
    
    if (!tier) {
      return res.status(404).json({ error: 'Tier not found' });
    }
    
    res.json(tier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTier = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    
    const updatedTier = await prisma.tier.update({
      where: { id: parseInt(id) },
      data: {
        type,
      },
    });
    
    res.json(updatedTier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTier = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.tier.delete({
      where: { id: parseInt(id) },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTier,
  getAllTiers,
  getTierById,
  updateTier,
  deleteTier,
};