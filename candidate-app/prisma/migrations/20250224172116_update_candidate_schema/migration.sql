/*
  Warnings:

  - A unique constraint covering the columns `[linkedin]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "skills" SET DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_linkedin_key" ON "Candidate"("linkedin");
