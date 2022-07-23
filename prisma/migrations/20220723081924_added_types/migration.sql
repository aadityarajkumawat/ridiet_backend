/*
  Warnings:

  - You are about to drop the column `types` on the `DietCollection` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `DiseasesCollection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DietCollection" DROP COLUMN "types";

-- AlterTable
ALTER TABLE "DiseasesCollection" DROP COLUMN "type",
ADD COLUMN     "types" TEXT[];
