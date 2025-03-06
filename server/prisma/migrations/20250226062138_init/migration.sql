/*
  Warnings:

  - Added the required column `price_id` to the `Order_Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_item` ADD COLUMN `price_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Pricing_Details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
