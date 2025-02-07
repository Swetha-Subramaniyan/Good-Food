/*
  Warnings:

  - Added the required column `ordered_date` to the `User_Food_Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_food_report` ADD COLUMN `ordered_date` DATETIME(3) NOT NULL;
