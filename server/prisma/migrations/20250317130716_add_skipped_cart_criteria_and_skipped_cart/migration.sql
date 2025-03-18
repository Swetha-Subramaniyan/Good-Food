-- CreateTable
CREATE TABLE `Skipped_Cart` (
    `skipped_cart_id` INTEGER NOT NULL AUTO_INCREMENT,
    `skipped_meal_item_id` INTEGER NOT NULL,
    `skipped_date` DATETIME(3) NOT NULL,
    `user_subscription_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `validity` VARCHAR(191) NOT NULL,
    `validity_date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`skipped_cart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skipped_Cart_Criteria` (
    `skipped_cart_criteria_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_criteria_id` INTEGER NOT NULL,
    `skip_prior_time` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`skipped_cart_criteria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Skipped_Cart` ADD CONSTRAINT `Skipped_Cart_skipped_meal_item_id_fkey` FOREIGN KEY (`skipped_meal_item_id`) REFERENCES `Meal_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skipped_Cart` ADD CONSTRAINT `Skipped_Cart_user_subscription_id_fkey` FOREIGN KEY (`user_subscription_id`) REFERENCES `User_Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skipped_Cart` ADD CONSTRAINT `Skipped_Cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skipped_Cart_Criteria` ADD CONSTRAINT `Skipped_Cart_Criteria_order_criteria_id_fkey` FOREIGN KEY (`order_criteria_id`) REFERENCES `Order_Criteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
