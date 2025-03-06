/*
  Warnings:

  - Added the required column `customer_id` to the `Order_Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_item` ADD COLUMN `customer_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `customer_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
