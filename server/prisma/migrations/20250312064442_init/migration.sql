-- CreateTable
CREATE TABLE `NotificationType` (
    `notification_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`notification_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationResponse` (
    `notification_response_id` INTEGER NOT NULL AUTO_INCREMENT,
    `notification_id` INTEGER NOT NULL,
    `notification_status` ENUM('Pending', 'Sent', 'Failed') NOT NULL,
    `notification_type_id` INTEGER NOT NULL,
    `send_at` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`notification_response_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NotificationResponse` ADD CONSTRAINT `NotificationResponse_notification_id_fkey` FOREIGN KEY (`notification_id`) REFERENCES `Notification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationResponse` ADD CONSTRAINT `NotificationResponse_notification_type_id_fkey` FOREIGN KEY (`notification_type_id`) REFERENCES `NotificationType`(`notification_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;
