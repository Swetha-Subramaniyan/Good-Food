const express = require("express");
const {
    createQuantity,
    getAllQuantities,
    getQuantityById,
    updateQuantity,
    deleteQuantity,
} = require("../controllers/admin.quantity.controller");
const router = express.Router();

router.post('/craetequantity', createQuantity);
router.get('/getquantity', getAllQuantities);
router.get('/:id', getQuantityById);
router.put('/:id', updateQuantity);
router.delete('/:id', deleteQuantity);

module.exports = router;
