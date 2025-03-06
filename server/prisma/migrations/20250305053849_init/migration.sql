/*
  Warnings:

  - Added the required column `parent_plan_id` to the `Order_Criteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal_type_id` to the `Subscription_Food_Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_criteria` ADD COLUMN `parent_plan_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `subscription_food_menu` ADD COLUMN `meal_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Subscription_Food_Menu` ADD CONSTRAINT `Subscription_Food_Menu_meal_type_id_fkey` FOREIGN KEY (`meal_type_id`) REFERENCES `Meal_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Criteria` ADD CONSTRAINT `Order_Criteria_parent_plan_id_fkey` FOREIGN KEY (`parent_plan_id`) REFERENCES `Parent_Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Daily_Menu` ADD CONSTRAINT `Daily_Menu_subscription_food_menu_id_fkey` FOREIGN KEY (`subscription_food_menu_id`) REFERENCES `Subscription_Food_Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
