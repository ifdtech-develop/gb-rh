/*
  Warnings:

  - Added the required column `about` to the `candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate" ADD COLUMN     "about" TEXT NOT NULL;
