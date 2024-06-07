/*
  Warnings:

  - You are about to drop the column `CustomerName` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `customerName` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "CustomerName",
ADD COLUMN     "customerName" TEXT NOT NULL;
