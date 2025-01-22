/*
  Warnings:

  - You are about to drop the column `address` on the `user_address` table. All the data in the column will be lost.
  - You are about to drop the column `alternate_phone` on the `user_address` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `user_address` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user_address` table. All the data in the column will be lost.
  - You are about to drop the column `user_details_id` on the `user_address` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `User_Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User_Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User_Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `User_Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_address` DROP FOREIGN KEY `User_Address_user_details_id_fkey`;

-- DropIndex
DROP INDEX `User_Address_user_details_id_fkey` ON `user_address`;

-- AlterTable
ALTER TABLE `user_address` DROP COLUMN `address`,
    DROP COLUMN `alternate_phone`,
    DROP COLUMN `area`,
    DROP COLUMN `phone`,
    DROP COLUMN `user_details_id`,
    ADD COLUMN `customer_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL,
    MODIFY `pincode` VARCHAR(191) NOT NULL;
