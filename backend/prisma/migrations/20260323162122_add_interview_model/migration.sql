/*
  Warnings:

  - The `status` column on the `Interview` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "InterviewStage" AS ENUM ('APPLIED', 'PHONE', 'TECH_SCREEN', 'ONSITE', 'OFFER', 'FINAL', 'HR', 'REJECTED');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('active', 'passed', 'rejected', 'offer');

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "status",
ADD COLUMN     "status" "InterviewStatus" NOT NULL DEFAULT 'active';

-- DropEnum
DROP TYPE "Status";
