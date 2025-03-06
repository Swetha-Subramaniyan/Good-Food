/*
  Warnings:

  - You are about to drop the column `price_id` on the `order_item` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `Order_Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `Order_Item_price_id_fkey`;

-- DropIndex
DROP INDEX `Order_Item_price_id_fkey` ON `order_item`;

-- AlterTable
ALTER TABLE `order_item` DROP COLUMN `price_id`,
    ADD COLUMN `order_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
