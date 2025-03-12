/*
  Warnings:

  - You are about to alter the column `order_time` on the `order_criteria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `cutoff_time` on the `order_criteria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `order_criteria` MODIFY `order_time` DATETIME(3) NOT NULL,
    MODIFY `cutoff_time` DATETIME(3) NOT NULL;
