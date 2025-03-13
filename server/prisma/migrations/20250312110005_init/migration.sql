/*
  Warnings:

  - You are about to drop the column `user_id` on the `cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `user_id`;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
