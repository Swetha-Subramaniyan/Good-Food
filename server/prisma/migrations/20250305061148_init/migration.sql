-- AddForeignKey
ALTER TABLE `Daily_Menu` ADD CONSTRAINT `Daily_Menu_period_fkey` FOREIGN KEY (`period`) REFERENCES `Periodical`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
