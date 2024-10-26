/*
  Warnings:

  - You are about to drop the column `bookmarked` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "bookmarked",
ADD COLUMN     "profileId" TEXT NOT NULL;
