/*
  Warnings:

  - You are about to drop the column `oredr_id` on the `delivery` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `delivery` DROP COLUMN `oredr_id`,
    ADD COLUMN `image_url` VARCHAR(191) NULL,
    ADD COLUMN `order_id` INTEGER NOT NULL;
