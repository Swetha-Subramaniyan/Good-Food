const express = require("express");
const { getAllUsers, createUsers, getCustomerID, getUserAddress, } = require("../controllers/user.controllers");
const {authentication} = require('../utils/jwt')
const router = express.Router();


router.get("/getall", getAllUsers);
router.get('/getID',authentication,getCustomerID);
router.post("/create", createUsers);
router.get('/getUser',getUserAddress);



module.exports = router;


