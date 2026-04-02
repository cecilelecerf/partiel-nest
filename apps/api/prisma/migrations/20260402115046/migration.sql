/*
  Warnings:

  - You are about to drop the column `doneAt` on the `WorkoutExercice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutExercice" DROP COLUMN "doneAt",
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "sets" DROP NOT NULL,
ALTER COLUMN "reps" DROP NOT NULL;
