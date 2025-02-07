-- CreateTable
CREATE TABLE `User_Food_Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_subscription_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `breakfast_qty` INTEGER NOT NULL,
    `lunch_qty` INTEGER NOT NULL,
    `dinner_qty` INTEGER NOT NULL,
    `created_at` INTEGER NOT NULL,
    `updatedAt` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Food_Report` ADD CONSTRAINT `User_Food_Report_user_subscription_id_fkey` FOREIGN KEY (`user_subscription_id`) REFERENCES `User_Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
