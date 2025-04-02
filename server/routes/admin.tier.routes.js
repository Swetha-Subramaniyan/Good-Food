const express = require("express");
const {
    createTier,
    getAllTiers,
    getTierById,
    updateTier,
    deleteTier,
} = require("../controllers/admin.tier.controller");
const router = express.Router();

router.post('/tiers', createTier);
router.get('/tiers', getAllTiers);
router.get('/tiers/:id', getTierById);
router.put('/tiers/:id', updateTier);
router.delete('/tiers/:id', deleteTier);

module.exports = router;
