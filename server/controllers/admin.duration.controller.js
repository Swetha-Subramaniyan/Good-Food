const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createDuration = async (req, res) => {
  try {
    const { actual_days, addon_days } = req.body;
    
    const duration = await prisma.duration.create({
      data: {
        actual_days,
        addon_days,
      },
    });
    
    res.status(201).json(duration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDurations = async (req, res) => {
  try {
    const durations = await prisma.duration.findMany();
    res.json(durations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getDurationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const duration = await prisma.duration.findUnique({
      where: { id: parseInt(id) },
      include: {
        DurationSubs: true,
      },
    });
    
    if (!duration) {
      return res.status(404).json({ error: 'Duration not found' });
    }
    
    res.json(duration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDuration = async (req, res) => {
  try {
    const { id } = req.params;
    const { actual_days, addon_days } = req.body;
    
    const updatedDuration = await prisma.duration.update({
      where: { id: parseInt(id) },
      data: {
        actual_days,
        addon_days,
      },
    });
    
    res.json(updatedDuration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDuration = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.duration.delete({
      where: { id: parseInt(id) },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDuration,
  getAllDurations,
  getDurationById,
  updateDuration,
  deleteDuration,
};