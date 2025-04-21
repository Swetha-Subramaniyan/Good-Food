/*
  Warnings:

  - Added the required column `chef_id` to the `Order_Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Order_Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_response` ADD COLUMN `chef_id` INTEGER NOT NULL,
    ADD COLUMN `order_id` INTEGER NOT NULL;
