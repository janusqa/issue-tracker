/*
  Warnings:

  - You are about to drop the column `userId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_userId_fkey`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `userId`,
    ADD COLUMN `asigneeId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_asigneeId_fkey` FOREIGN KEY (`asigneeId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
