/*
  Warnings:

  - You are about to drop the column `asigneeId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_asigneeId_fkey`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `asigneeId`,
    ADD COLUMN `assigneeId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assigneeId_fkey` FOREIGN KEY (`assigneeId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
