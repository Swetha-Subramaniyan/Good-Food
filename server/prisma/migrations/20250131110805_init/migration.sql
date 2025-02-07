/*
  Warnings:

  - You are about to drop the column `order_item` on the `order_criteria` table. All the data in the column will be lost.
  - Added the required column `order_time` to the `Order_Criteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_criteria` DROP COLUMN `order_item`,
    ADD COLUMN `order_time` VARCHAR(191) NOT NULL;
