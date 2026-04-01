/*
  Warnings:

  - You are about to drop the `Training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTraining` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserTraining" DROP CONSTRAINT "UserTraining_exerciceId_fkey";

-- DropForeignKey
ALTER TABLE "UserTraining" DROP CONSTRAINT "UserTraining_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- DropTable
DROP TABLE "Training";

-- DropTable
DROP TABLE "UserTraining";

-- DropEnum
DROP TYPE "Difficulty";

-- CreateTable
CREATE TABLE "Exercice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "muscleGroup" TEXT NOT NULL,
    "secondaryMuscles" TEXT[],
    "type" "ExerciseType" NOT NULL,
    "equipment" "Equipment" NOT NULL,
    "tutorialUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExercice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "doneAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workoutId" INTEGER NOT NULL,
    "exerciceId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutExercice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercice" ADD CONSTRAINT "WorkoutExercice_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercice" ADD CONSTRAINT "WorkoutExercice_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Exercice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
