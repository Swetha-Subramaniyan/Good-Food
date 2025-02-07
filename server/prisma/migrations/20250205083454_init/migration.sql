-- AddForeignKey
ALTER TABLE `User_Food_Report` ADD CONSTRAINT `UserFoodReportToSubscription` FOREIGN KEY (`user_subscription_id`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
