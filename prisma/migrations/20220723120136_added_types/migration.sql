-- DropForeignKey
ALTER TABLE "Diseases" DROP CONSTRAINT "Diseases_diseaseId_fkey";

-- AddForeignKey
ALTER TABLE "Diseases" ADD CONSTRAINT "Diseases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
