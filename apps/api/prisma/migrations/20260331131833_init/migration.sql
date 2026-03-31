-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('STRENGTH', 'CARDIO', 'MOBILITY', 'HYPERTROPHY');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Equipment" AS ENUM ('DUMBBELL', 'BARBELL', 'MACHINE', 'BODYWEIGHT', 'KETTLEBELL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "isVerifiedEmail" BOOLEAN NOT NULL DEFAULT false,
    "otpCode" TEXT,
    "otpExpiredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "muscleGroup" TEXT NOT NULL,
    "secondaryMuscles" TEXT[],
    "type" "ExerciseType" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "equipment" "Equipment" NOT NULL,
    "tutorialUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTraining" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTraining_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
