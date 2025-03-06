/*
  Warnings:

  - You are about to drop the column `user_id` on the `subscription_payment` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `Subscription_Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `subscription_payment` DROP FOREIGN KEY `Subscription_Payment_user_id_fkey`;

-- DropIndex
DROP INDEX `Subscription_Payment_user_id_fkey` ON `subscription_payment`;

-- AlterTable
ALTER TABLE `subscription_payment` DROP COLUMN `user_id`,
    ADD COLUMN `customer_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Subscription_Payment` ADD CONSTRAINT `Subscription_Payment_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_food_item_id_fkey` FOREIGN KEY (`food_item_id`) REFERENCES `Food_Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
