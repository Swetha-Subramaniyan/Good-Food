/*
  Warnings:

  - Added the required column `parent_plan_id` to the `Subscription_Food_Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tier_id` to the `Subscription_Food_Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subscription_food_menu` ADD COLUMN `parent_plan_id` INTEGER NOT NULL,
    ADD COLUMN `tier_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Subscription_Food_Menu` ADD CONSTRAINT `Subscription_Food_Menu_parent_plan_id_fkey` FOREIGN KEY (`parent_plan_id`) REFERENCES `Parent_Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Food_Menu` ADD CONSTRAINT `Subscription_Food_Menu_tier_id_fkey` FOREIGN KEY (`tier_id`) REFERENCES `Tier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
