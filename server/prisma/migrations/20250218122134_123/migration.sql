-- AlterTable
ALTER TABLE `additional_itemss` MODIFY `is_additional` BOOLEAN NULL;

-- AddForeignKey
ALTER TABLE `Additional_Itemss` ADD CONSTRAINT `Additional_Itemss_food_item_id_fkey` FOREIGN KEY (`food_item_id`) REFERENCES `Food_Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
