/*
  Warnings:

  - You are about to alter the column `cancellation_status` on the `cancellation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `cancellation` MODIFY `cancellation_status` BOOLEAN NOT NULL DEFAULT false;
