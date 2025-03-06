/*
  Warnings:

  - You are about to drop the column `food_item_id` on the `order_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `Order_Item_food_item_id_fkey`;

-- DropIndex
DROP INDEX `Order_Item_food_item_id_fkey` ON `order_item`;

-- AlterTable
ALTER TABLE `order_item` DROP COLUMN `food_item_id`;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_ordered_address_id_fkey` FOREIGN KEY (`ordered_address_id`) REFERENCES `User_Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
