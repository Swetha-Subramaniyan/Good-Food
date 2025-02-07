const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCarts = async(req,res) => {
    try {
        const getCart = await prisma.cart.findMany()
         res.status(200).json({message : "success",getCart})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "No items in cart"})
    }
}

const createCart = async(req,res) => {
    try {
        const {user_id,customer_id} = req.user;
        const {subscription_id,food_item_id} = req.body;
        const newCart = await prisma.cart.create({
            data : {
                subscription_id,
                user_id,
                customer_id,
                food_item_id,
                created_at : new Date(),
                updatedAt : new Date()
            }
        })
        res.status(200).json({message : "Created",newCart})
    } catch (error) {
        console.log(error)
        res.status(404).json({error : "Failure"})
    }
}


module.exports = {getAllCarts,createCart}