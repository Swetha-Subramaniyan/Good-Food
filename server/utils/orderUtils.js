// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const validateOrderTime = async (meal_type_id) => {
//   const criteria = await prisma.order_Criteria.findMany({
//     where: { meal_type_id },
//   });

//   if (!criteria) {
//     throw new Error("Invalid meal type.");
//   }

//   const currentTime = new Date();
//   const orderTime = new Date(`1970-01-01T${criteria.order_time}`);
//   const cutoffTime = new Date(`1970-01-01T${criteria.cutoff_time}`);

//   if (currentTime > cutoffTime) {
//     throw new Error("Order time has passed. You cannot order now.");
//   }

//   return criteria;
// };

// module.exports = { validateOrderTime };





// // // TESTING FOR CUTOFF TIME OVER

// // const { PrismaClient } = require('@prisma/client');
// // const prisma = new PrismaClient();
// // const validateOrderTime = async (meal_type_id) => {
// //   const criteria = await prisma.order_Criteria.findMany({
// //     where: { meal_type_id },
// //   });

// //   if (!criteria) {
// //     throw new Error("Invalid meal type.");
// //   }

// //   const currentTime = new Date(); // Current system time
// //   const cutoffTime = new Date(`1970-01-01T06:00:00`); // Force expired time

// //   if (currentTime > cutoffTime) {
// //     throw new Error("Order time has passed. You cannot order now.");
// //   }

// //   return criteria;
// // };


// // module.exports = {validateOrderTime}