const express = require("express");
const { getAllUsers, createUsers, getCustomerID, getUserAddress, sendEmailOnUserAddressUpdate, sendEmailOnUserMultipleAddressUpdate } = require("../controllers/user.controllers");
const {authentication} = require('../utils/jwt')
const router = express.Router();


router.get("/getall", getAllUsers);
router.get('/getID',authentication,getCustomerID);
router.post("/create", createUsers);
router.get('/getUser',getUserAddress);

// SEND EMAIL ON SUCESSFULL ADDRESS UPDATE
// METHOD : GET
router.get("/sendEmailOnUserAddressUpdate", sendEmailOnUserAddressUpdate);


// SEND EMAIL ON SUCESSFULLY ADDING MORE THAN ONE ADDRESS UPDATE
// METHOD : GET
router.get("/sendEmailOnUserMultipleAddressUpdate", sendEmailOnUserMultipleAddressUpdate);

module.exports = router;


