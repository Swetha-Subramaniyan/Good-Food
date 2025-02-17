-- DropForeignKey
ALTER TABLE `user_subscription` DROP FOREIGN KEY `User_Subscription_customer_id_fkey`;

-- AlterTable
ALTER TABLE `subscription_order` MODIFY `customer_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User_Address` ADD CONSTRAINT `User_Address_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Subscription` ADD CONSTRAINT `User_Subscription_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Order` ADD CONSTRAINT `Subscription_Order_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
