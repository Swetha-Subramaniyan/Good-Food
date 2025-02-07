-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_food_item_id_fkey` FOREIGN KEY (`food_item_id`) REFERENCES `Food_Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
