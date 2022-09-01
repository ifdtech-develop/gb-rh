/*
  Warnings:

  - You are about to drop the `candidato` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "candidato";

-- CreateTable
CREATE TABLE "candidate" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "dateBirth" TIMESTAMP(3) NOT NULL,
    "adress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "curriculo" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("id")
);
