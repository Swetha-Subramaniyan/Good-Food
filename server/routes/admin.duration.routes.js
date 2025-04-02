const express = require("express");
const {
  createDuration,
  getAllDurations,
  getDurationById,
  updateDuration,
  deleteDuration,
} = require("../controllers/admin.duration.controller");
const router = express.Router();

router.post('/createduration', createDuration);
router.get('/getduration', getAllDurations);
router.get('/:id', getDurationById);
router.put('/:id', updateDuration);
router.delete('/:id', deleteDuration);

module.exports = router;
