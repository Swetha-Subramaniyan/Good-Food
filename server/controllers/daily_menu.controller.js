const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const createPeriodical = async(req,res) => {
    try {
        const {period,comments}=req.body;

        const newPeriod = await prisma.periodical.create({
            data: {
                period,
                comments,
                created_at: new Date(),
                updatedAt: new Date()
            }
        })
        res.status(200).json({message : "Created ",newPeriod})
    } catch (error) {
        console.log(error)
        res.status(404).json({error:"No periodical created yet"})
    }
}


const createDailyMenu = async(req,res) => {
    try {
        const {period,subscription_food_menu_id}=req.body;
        const newMenu = await prisma.daily_Menu.create({
            data:{
                period,
                subscription_food_menu_id,
                created_at:new Date(),
                updatedAt: new Date()
            }
        })
        res.status(200).json({message : "Daily Menu Created",newMenu})
    } catch (error) {
        console.log(error)
        res.status(404).json({error:"No menu created"})
    }
}


const getMenuwithPeriod = async(req,res) => {
    try {
        const {period}=req.body;
        const getMenu = await prisma.daily_Menu.findMany({
            where:{period},
            select:{
                subscription_food_menu_id:true,
                periods:{
                  select : {
                    period:true
                  }  
                },
                subFoodMenuu:{
                    select:{
                        food_item_id:true,
                        FoodItems : {
                            select : {
                               item_name:true ,
                               item_type:true
                            }
                        },
                       meal_type_id:true,
                       mealType:{
                        select:{
                            meal_type:true
                        }
                       } 
                    }
                }
            }
        })
        const formattedMenu = getMenu.map(item => ({
            period_name : item.periods.period,
            food_name : item.subFoodMenuu.FoodItems.item_name,
            food_type:item.subFoodMenuu.mealType.meal_type,
            

        }))
        res.status(200).json({message:"Menu fetched successfully",formattedMenu})
    } catch (error) {
        console.log(error)
        res.status(404).json({error:"No menu is displayed"})
    }
}

module.exports={createDailyMenu,createPeriodical,getMenuwithPeriod}


