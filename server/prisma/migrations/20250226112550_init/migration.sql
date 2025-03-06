/*
  Warnings:

  - Added the required column `meal_type_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `meal_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_meal_type_id_fkey` FOREIGN KEY (`meal_type_id`) REFERENCES `Meal_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
