/*
  Warnings:

  - You are about to alter the column `total_meal` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `total_meal` INTEGER NOT NULL;
