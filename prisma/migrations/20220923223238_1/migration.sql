-- CreateTable
CREATE TABLE "candidate" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "company" BIGINT NOT NULL,
    "sector" VARCHAR(255) NOT NULL,
    "type_vacancy" VARCHAR(255) NOT NULL,
    "manager" VARCHAR(255) NOT NULL,
    "vacancy" VARCHAR(255) NOT NULL,
    "schooling" TEXT NOT NULL,
    "hiring_justification" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "languages" VARCHAR(255) NOT NULL,
    "start_forecast" VARCHAR(255) NOT NULL,
    "document" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255),
    "status" VARCHAR(255) NOT NULL,
    "userid" INTEGER,
    "controllership" INTEGER,
    "director" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("id")
);
