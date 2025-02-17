const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUserFoodReport = async (req, res) => {
    try {
        const user_subscription_id = Number(req.body.user_subscription_id);
        const { user_id, customer_id } = req.user;

        if (!user_subscription_id) {
            return res.status(400).json({ error: "User Subscription ID is required" });
        }

        const userSubscription = await prisma.user_Subscription.findUnique({
            where: { id: user_subscription_id },
            select: {
                start_date: true,
                validity_days: true,
            }
        });

        if (!userSubscription) {
            return res.status(400).json({ error: "Invalid User Subscription ID" });
        }

        console.log("Subscription found! Proceeding to create reports...");

        const { start_date, validity_days } = userSubscription;

        let reports = [];
        for (let i = 0; i < validity_days; i++) {
            const orderedDate = new Date(start_date);
            orderedDate.setDate(start_date.getDate() + i); // Increment date for each entry

            const report = await prisma.user_Food_Report.create({
                data: {
                    user_subscription_id,
                    user_id,
                    customer_id,
                    breakfast_qty: 1,
                    lunch_qty: 1,
                    dinner_qty: 1,
                    ordered_date: orderedDate,
                    created_at : new Date(),
                    updatedAt : new Date() // Ensure this is not null
                }
            });

            reports.push(report);
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
