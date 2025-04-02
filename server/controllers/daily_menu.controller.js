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


const createDailyMenu = async (req, res) => {
    try {
        const { period, subscription_food_menu_ids } = req.body;

      

        const newMenus = await prisma.daily_Menu.createMany({
            data: subscription_food_menu_ids.map(subscription_food_menu_id => ({
                period,
                subscription_food_menu_id,
                created_at: new Date(),
                updatedAt: new Date()
            })),
            
        });

        res.status(200).json({ message: "Daily Menus Created", newMenus });
    } catch (error) {
        console.error("Error creating daily menus:", error);
        res.status(500).json({ error: "Failed to create daily menus" });
    }
};


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
                        
                        
                        FoodSubscription:{
                            
                            select: {
                                
                                 parentPlan1: {
                                    select : 
                                    {
                                        id:true,
                                        plan_name:true
                                    }
                                 },
                                 PricingDetails:{
                                    select : {
                                        id:true,
                                        price:true
                                    }
                                 }
                            }
                        },
                        
                        
                        FoodItems : {
                            select : {
                                id:true,
                               item_name:true ,
                               item_type:true
                            }
                        },
                       mealType:{
                        select:{
                            id:true,
                            meal_type:true
                        }
                       } 
                    }
                }
            }
        })
        const formattedMenu = getMenu.map(item => ({
            period_name : item.periods.period,
            plan_id : item.subFoodMenuu.FoodSubscription.parentPlan1.id,
            plan_name:item.subFoodMenuu.FoodSubscription.parentPlan1.plan_name,
            meal_type_id : item.subFoodMenuu.mealType.id,
            meal_type : item.subFoodMenuu.mealType.meal_type,
            food_name : item.subFoodMenuu.FoodItems.item_name,
            food_type:item.subFoodMenuu.mealType.meal_type,
            price_id:item.subFoodMenuu.FoodSubscription.PricingDetails.id,
            price:item.subFoodMenuu.FoodSubscription.PricingDetails.price
            

        }))
        res.status(200).json({message:"Menu fetched successfully",formattedMenu})
    } catch (error) {
        console.log(error)
        res.status(404).json({error:"No menu is displayed"})
    }
}

const getAllMenu = async (req, res) => {
    const { period } = req.body;
  
    try {
      const getDaily = await prisma.daily_Menu.findMany({
        where: { period },
        select: {
          periods: { select: { period: true } },
          subFoodMenuu: {
            select: {
              id: true,
              food_item_id: true,
              
              FoodItems: { select: { 
                item_name: true,
                image_url:true 
            } },
              
              meal_type_id: true,
              mealType: { select: { meal_type: true } },
              FoodSubscription : {
                select : {
                    parentPlan1 : {
                        select : {
                            id:true,
                            plan_name:true
                        }
                    },
                    TierSub : {
                        select : {
                            id:true,
                            type:true,

                        }
                    }
                }
              }
            }
          }
        }
      });
  
      // Format the data into the desired structure
      const formattedMenu = getDaily.reduce((acc, item) => {
        const day = item.periods.period || 'Uncategorized';
        const mealType = item.subFoodMenuu.mealType.meal_type || 'Other';
        const foodName = item.subFoodMenuu.FoodItems.item_name;
       const image=item.subFoodMenuu.FoodItems.image_url;
        const plan_id= item.subFoodMenuu.FoodSubscription.parentPlan1.id;
        const plan_name=item.subFoodMenuu.FoodSubscription.parentPlan1.plan_name;
        const tierId=item.subFoodMenuu.FoodSubscription.TierSub.id;
        const tier=item.subFoodMenuu.FoodSubscription.TierSub.type
  
        if (!acc[day]) acc[day] = {};
        if (!acc[day][mealType]) acc[day][mealType] = [];
  
        acc[day][mealType].push({
          food_name: foodName,
          parent_plan_id:plan_id,
          plan_name:plan_name,
          tier_id:tierId,
          tier:tier,
          meal_type_id: item.subFoodMenuu.meal_type_id,
          meal_type:item.subFoodMenuu.mealType.meal_type,
          image:image,
         
        });
  
        return acc;
      }, {});
  
      res.status(200).json({ message: "Success", formattedMenu });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch menu" });
    }
  };


  

module.exports={createDailyMenu,createPeriodical,getMenuwithPeriod,getAllMenu}


