/*
  Warnings:

  - Changed the type of `created_at` on the `user_food_report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updatedAt` on the `user_food_report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `user_food_report` DROP COLUMN `created_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
