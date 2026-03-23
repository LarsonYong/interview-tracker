/*
  Warnings:

  - You are about to drop the column `appliedDate` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Interview` table. All the data in the column will be lost.
  - The `status` column on the `Interview` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_userId_fkey";

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "appliedDate",
DROP COLUMN "location",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "interviewDate" TIMESTAMP(3),
ADD COLUMN     "jobUrl" TEXT,
ADD COLUMN     "salary" INTEGER,
ADD COLUMN     "stage" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- CreateIndex
CREATE INDEX "Interview_userId_idx" ON "Interview"("userId");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
