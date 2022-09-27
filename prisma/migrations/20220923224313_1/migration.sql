/*
  Warnings:

  - You are about to alter the column `company` on the `candidate` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "candidate" ALTER COLUMN "company" SET DATA TYPE INTEGER;
