-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'Male',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "DiseasesCollection" (
    "diseasesId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "DiseasesCollection_pkey" PRIMARY KEY ("diseasesId")
);

-- CreateTable
CREATE TABLE "AllergyCollection" (
    "allergyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "AllergyCollection_pkey" PRIMARY KEY ("allergyId")
);

-- CreateTable
CREATE TABLE "DietCollection" (
    "dietId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DietCollection_pkey" PRIMARY KEY ("dietId")
);

-- CreateTable
CREATE TABLE "Diseases" (
    "diseaseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Allergy" (
    "allergyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Diet" (
    "dietId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "Diseases_diseaseId_userId_key" ON "Diseases"("diseaseId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Allergy_allergyId_userId_key" ON "Allergy"("allergyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Diet_dietId_userId_key" ON "Diet"("dietId", "userId");

-- AddForeignKey
ALTER TABLE "Diseases" ADD CONSTRAINT "Diseases_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
