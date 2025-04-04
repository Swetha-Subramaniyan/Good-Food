/*
  Warnings:

  - You are about to drop the column `user_id` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `user_position_id` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `order_response` table. All the data in the column will be lost.
  - Added the required column `delivery_user_id` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `delivery` DROP COLUMN `user_id`,
    DROP COLUMN `user_position_id`,
    ADD COLUMN `delivery_user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order_response` DROP COLUMN `user_id`;
