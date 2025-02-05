-- AlterTable
ALTER TABLE `User` ADD COLUMN `status` ENUM('Blocked', 'Active') NOT NULL DEFAULT 'Active';
