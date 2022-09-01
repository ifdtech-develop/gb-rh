/*
  Warnings:

  - You are about to drop the column `adress` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `candidate` table. All the data in the column will be lost.
  - Added the required column `address` to the `candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate" DROP COLUMN "adress",
DROP COLUMN "telephone",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
