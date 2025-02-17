/*
  Warnings:

  - You are about to drop the column `order_id` on the `order_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `order_item` DROP FOREIGN KEY `Order_Item_order_id_fkey`;

-- DropIndex
DROP INDEX `Order_Item_order_id_fkey` ON `order_item`;

-- AlterTable
ALTER TABLE `order_item` DROP COLUMN `order_id`;
