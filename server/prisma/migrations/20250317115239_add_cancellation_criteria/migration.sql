/*
  Warnings:

  - You are about to drop the column `createdAt` on the `cancellation_criteria` table. All the data in the column will be lost.
  - You are about to drop the column `planDuration` on the `cancellation_criteria` table. All the data in the column will be lost.
  - You are about to drop the column `priorMeal` on the `cancellation_criteria` table. All the data in the column will be lost.
  - You are about to drop the column `priorTime` on the `cancellation_criteria` table. All the data in the column will be lost.
  - You are about to drop the column `refundPercentage` on the `cancellation_criteria` table. All the data in the column will be lost.
  - Added the required column `plan_Duration` to the `Cancellation_Criteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prior_Meal` to the `Cancellation_Criteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prior_Time` to the `Cancellation_Criteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refund_Percentage` to the `Cancellation_Criteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cancellation_criteria` DROP COLUMN `createdAt`,
    DROP COLUMN `planDuration`,
    DROP COLUMN `priorMeal`,
    DROP COLUMN `priorTime`,
    DROP COLUMN `refundPercentage`,
    ADD COLUMN `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `plan_Duration` VARCHAR(191) NOT NULL,
    ADD COLUMN `prior_Meal` VARCHAR(191) NOT NULL,
    ADD COLUMN `prior_Time` VARCHAR(191) NOT NULL,
    ADD COLUMN `refund_Percentage` VARCHAR(191) NOT NULL;
