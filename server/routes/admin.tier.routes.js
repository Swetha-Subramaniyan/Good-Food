const express = require("express");
const {
    createTier,
    getAllTiers,
    getTierById,
    updateTier,
    deleteTier,
} = require("../controllers/admin.tier.controller");
const router = express.Router();

router.post('/createtier', createTier);
router.get('/gettier', getAllTiers);
router.get('/:id', getTierById);
router.put('/:id', updateTier);
router.delete('/:id', deleteTier);

module.exports = router;
