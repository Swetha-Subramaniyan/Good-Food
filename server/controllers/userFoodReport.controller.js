const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUserFoodReport = async (req, res) => {
    try {
        const user_subscription_id = Number(req.body.user_subscription_id);
        const { user_id, customer_id } = req.user;

        if (!user_subscription_id) {
            return res.status(400).json({ error: "User Subscription ID is required" });
        }

        // Fetch user subscription with related subscription details
        const userSubscription = await prisma.user_Subscription.findUnique({
            where: { id: user_subscription_id },
            select: {
                start_date: true,
                end_date: true,
                Subscription: {
                    select: {
                        parentPlan1: { select: { plan_name: true } },
                        TierSub: { select: { type: true } },
                        MealSub: { select: { meal_type: true } }
                    }
                }
            }
        });

        console.log("Fetched User Subscription:", userSubscription);

        if (!userSubscription) {
            return res.status(400).json({ error: "Invalid User Subscription ID" });
        }

        const { start_date, end_date, Subscription } = userSubscription;
        const parentPlan = Subscription?.parentPlan1?.plan_name || "";
        const tier = Subscription?.TierSub?.type || "";
        const mealType = Subscription?.MealSub?.meal_type || "";

        // Initialize meal quantities
        let breakfast_qty = 0;
        let lunch_qty = 0;
        let dinner_qty = 0;

        // Conditional logic based on parent plan, tier, and meal type
        if (parentPlan.toLowerCase() === "combo plan") {
            breakfast_qty = 1;
            lunch_qty = 1;
            dinner_qty = 1;
        } else if (parentPlan.toLowerCase() === "individual plan") {
            if (mealType.toLowerCase() === "breakfast") {
                breakfast_qty = 1;
            } else if (mealType.toLowerCase() === "lunch") {
                lunch_qty = 1;
            } else if (mealType.toLowerCase() === "dinner") {
                dinner_qty = 1;
            }
        } else {
            return res.status(400).json({ error: "Invalid plan, tier, or meal type" });
        }

        // Generate reports for each day in the subscription period
        const reports = [];
        let currentDate = new Date(start_date);
        console.log("START DATE :",currentDate)
        const endDate = new Date(end_date);
        console.log("END DATE :",endDate)


        while (currentDate <= endDate) {
            const report = await prisma.user_Food_Report.create({
                data: {
                    user_subscription_id,
                    user_id,
                    customer_id,
                    breakfast_qty,
                    lunch_qty,
                    dinner_qty,
                    ordered_date: new Date(currentDate),
                    created_at: new Date(),
                    updatedAt: new Date()
                }
            });

            reports.push(report);

    currentDate.setDate(currentDate.getDate() + 1);

    if (currentDate > endDate) break; 
}

        res.status(200).json({ message: "Reports created successfully", reports });
    } catch (error) {
        console.error("Error creating user food report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Fetch User Food Reports dynamically
const getUserReport = async (req, res) => {
    try {
        const { user_subscription_id } = req.body;

        if (!user_subscription_id) {
            return res.status(400).json({ error: "User Subscription ID is required" });
        }

        const reports = await prisma.user_Food_Report.findMany({
            where: { user_subscription_id: Number(user_subscription_id) },
            select: {
                id: true,
                created_at: true,
                breakfast_qty: true,
                lunch_qty: true,
                dinner_qty: true
            }
        });

        if (reports.length === 0) {
            return res.status(404).json({ message: "No User Food Report Found" });
        }

        res.status(200).json({ message: "User Reports Fetched Successfully", reports });
    } catch (error) {
        console.error("Error fetching user food report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { createUserFoodReport, getUserReport };
