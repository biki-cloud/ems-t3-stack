/*
  Warnings:

  - Added the required column `genre` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('MUSIC', 'SPORTS', 'EDUCATION', 'ENTERTAINMENT', 'OTHER');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "genre" "Genre" NOT NULL;
