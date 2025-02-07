-- CreateTable
CREATE TABLE `Order_Criteria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meal_type_id` INTEGER NOT NULL,
    `order_item` VARCHAR(191) NOT NULL,
    `cutoff_time` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_sub_id` INTEGER NOT NULL,
    `food_item_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order_Criteria` ADD CONSTRAINT `Order_Criteria_meal_type_id_fkey` FOREIGN KEY (`meal_type_id`) REFERENCES `Meal_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_user_sub_id_fkey` FOREIGN KEY (`user_sub_id`) REFERENCES `User_Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_food_item_id_fkey` FOREIGN KEY (`food_item_id`) REFERENCES `Food_Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Pricing_Details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
