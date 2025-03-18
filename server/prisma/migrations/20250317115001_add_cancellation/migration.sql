-- CreateTable
CREATE TABLE `CancellationCriteria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `planDuration` VARCHAR(191) NOT NULL,
    `priorMeal` VARCHAR(191) NOT NULL,
    `priorTime` VARCHAR(191) NOT NULL,
    `refundPercentage` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
