-- DropForeignKey
ALTER TABLE `subscription_order` DROP FOREIGN KEY `Subscription_Order_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_address` DROP FOREIGN KEY `User_Address_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_subscription` DROP FOREIGN KEY `User_Subscription_customer_id_fkey`;

-- DropIndex
DROP INDEX `Subscription_Order_customer_id_key` ON `subscription_order`;

-- DropIndex
DROP INDEX `User_Address_customer_id_key` ON `user_address`;

-- DropIndex
DROP INDEX `User_Subscription_customer_id_key` ON `user_subscription`;

-- AddForeignKey
ALTER TABLE `Food_Items` ADD CONSTRAINT `Food_Items_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Pricing_Details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Criteria` ADD CONSTRAINT `Order_Criteria_meal_type_id_fkey` FOREIGN KEY (`meal_type_id`) REFERENCES `Meal_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Pricing_Details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Rating` ADD CONSTRAINT `User_Rating_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
