/*
  Warnings:

  - Added the required column `duration` to the `UserTraining` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reps` to the `UserTraining` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sets` to the `UserTraining` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciceId` to the `UserTraining` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserTraining` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTraining" ADD COLUMN     "doneAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "sets" INTEGER NOT NULL,
ADD COLUMN     "exerciceId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserTraining" ADD CONSTRAINT "UserTraining_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTraining" ADD CONSTRAINT "UserTraining_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
