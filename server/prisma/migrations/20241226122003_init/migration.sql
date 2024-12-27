/*
  Warnings:

  - Added the required column `parent_id` to the `Parent_Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parent_plan` ADD COLUMN `parent_id` INTEGER NOT NULL;
