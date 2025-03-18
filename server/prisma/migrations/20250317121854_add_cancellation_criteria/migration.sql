/*
  Warnings:

  - Added the required column `approval` to the `Cancellation_Criteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cancellation_criteria` ADD COLUMN `approval` BOOLEAN NOT NULL;
