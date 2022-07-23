-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_dietId_fkey";

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
