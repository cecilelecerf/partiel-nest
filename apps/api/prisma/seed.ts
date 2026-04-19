import {
  Equipment,
  ExerciseType,
  PrismaClient,
} from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await hash('Password123!', 10);
  await prisma.workoutExercise.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password,
      name: 'User',
      role: 'USER',
      isVerifiedEmail: true,
    },
  });

  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password,
      name: 'Alice',
      role: 'USER',
      isVerifiedEmail: true,
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password,
      name: 'Bob',
      role: 'USER',
      isVerifiedEmail: true,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password,
      name: 'Admin',
      role: 'ADMIN',
      isVerifiedEmail: true,
    },
  });

  const exercises = await Promise.all([
    prisma.exercise.create({
      data: {
        name: 'Squat',
        description:
          'Exercise de base pour les jambes, debout avec une barre sur les épaules.',
        muscleGroup: 'Jambes',
        secondaryMuscles: ['Fessiers', 'Lombaires', 'Abdominaux'],
        type: ExerciseType.STRENGTH,
        equipment: Equipment.BARBELL,
        tutorialUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Deadlift',
        description:
          "Soulevé de terre, exercise compound sollicitant l'ensemble du corps.",
        muscleGroup: 'Dos',
        secondaryMuscles: ['Jambes', 'Fessiers', 'Trapèzes', 'Abdominaux'],
        type: ExerciseType.STRENGTH,

        equipment: Equipment.BARBELL,
        tutorialUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Bench Press',
        description: 'Développé couché pour les pectoraux avec une barre.',
        muscleGroup: 'Pectoraux',
        secondaryMuscles: ['Triceps', 'Épaules'],
        type: ExerciseType.STRENGTH,
        equipment: Equipment.BARBELL,
        tutorialUrl: 'https://www.youtube.com/watch?v=SCVCLChPQFY',
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Pull-up',
        description:
          'Traction à la barre fixe, excellent pour le dos et les biceps.',
        muscleGroup: 'Dos',
        secondaryMuscles: ['Biceps', 'Épaules'],
        type: ExerciseType.STRENGTH,
        equipment: Equipment.BODYWEIGHT,
        tutorialUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Dips',
        description:
          'Exercise au poids du corps pour les triceps et les pectoraux.',
        muscleGroup: 'Triceps',
        secondaryMuscles: ['Pectoraux', 'Épaules'],
        type: ExerciseType.STRENGTH,
        equipment: Equipment.BODYWEIGHT,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Rowing Haltères',
        description: 'Tirage unilatéral avec haltère pour le dos.',
        muscleGroup: 'Dos',
        secondaryMuscles: ['Biceps', 'Épaules'],
        type: ExerciseType.STRENGTH,
        equipment: Equipment.DUMBBELL,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Développé Militaire',
        description: 'Exercise debout pour les épaules avec haltères ou barre.',
        muscleGroup: 'Épaules',
        secondaryMuscles: ['Triceps', 'Trapèzes'],
        type: ExerciseType.STRENGTH,
        equipment: Equipment.DUMBBELL,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Fentes',
        description: 'Exercise unilatéral pour les jambes et les fessiers.',
        muscleGroup: 'Jambes',
        secondaryMuscles: ['Fessiers', 'Abdominaux'],
        type: ExerciseType.STRENGTH,
        equipment: Equipment.DUMBBELL,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Hip Thrust',
        description:
          "Exercise d'isolation pour les fessiers avec barre ou haltère.",
        muscleGroup: 'Fessiers',
        secondaryMuscles: ['Ischio-jambiers', 'Lombaires'],
        type: ExerciseType.HYPERTROPHY,
        equipment: Equipment.BARBELL,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Curl Biceps',
        description: 'Flexion des bras avec haltères pour isoler les biceps.',
        muscleGroup: 'Bras',
        secondaryMuscles: ['Avant-bras'],
        type: ExerciseType.HYPERTROPHY,
        equipment: Equipment.DUMBBELL,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Gainage Planche',
        description:
          'Exercise isométrique pour renforcer la sangle abdominale.',
        muscleGroup: 'Abdominaux',
        secondaryMuscles: ['Lombaires', 'Épaules'],
        type: ExerciseType.STRENGTH,
        equipment: Equipment.BODYWEIGHT,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Burpees',
        description: 'Exercise cardio full body très intense.',
        muscleGroup: 'Full Body',
        secondaryMuscles: ['Pectoraux', 'Jambes', 'Abdominaux'],
        type: ExerciseType.CARDIO,
        equipment: Equipment.BODYWEIGHT,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Mountain Climbers',
        description:
          'Exercise cardio en position de planche avec mouvements de genoux.',
        muscleGroup: 'Abdominaux',
        secondaryMuscles: ['Épaules', 'Jambes'],
        type: ExerciseType.CARDIO,
        equipment: Equipment.BODYWEIGHT,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Pompes',
        description: 'Exercise classique au poids du corps pour les pectoraux.',
        muscleGroup: 'Pectoraux',
        secondaryMuscles: ['Triceps', 'Épaules'],
        type: ExerciseType.STRENGTH,
        equipment: Equipment.BODYWEIGHT,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Leg Press',
        description: 'Presse à cuisses en machine pour les jambes.',
        muscleGroup: 'Jambes',
        secondaryMuscles: ['Fessiers'],
        type: ExerciseType.HYPERTROPHY,
        equipment: Equipment.MACHINE,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Leg Curl',
        description: 'Flexion des jambes en machine pour les ischio-jambiers.',
        muscleGroup: 'Jambes',
        secondaryMuscles: ['Fessiers'],
        type: ExerciseType.HYPERTROPHY,
        equipment: Equipment.MACHINE,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Calf Raises',
        description: 'Élévation sur la pointe des pieds pour les mollets.',
        muscleGroup: 'Mollets',
        secondaryMuscles: [],
        type: ExerciseType.HYPERTROPHY,
        equipment: Equipment.MACHINE,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Face Pull',
        description:
          'Tirage à la corde vers le visage pour les épaules et la coiffe des rotateurs.',
        muscleGroup: 'Épaules',
        secondaryMuscles: ['Trapèzes', 'Dos'],
        type: ExerciseType.MOBILITY,
        equipment: Equipment.MACHINE,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Tirage Poulie Haute',
        description: 'Tirage vers le bas à la poulie pour le grand dorsal.',
        muscleGroup: 'Dos',
        secondaryMuscles: ['Biceps', 'Épaules'],
        type: ExerciseType.HYPERTROPHY,
        equipment: Equipment.MACHINE,
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Kettlebell Swing',
        description:
          'Balancé de kettlebell, exercise explosif pour les fessiers et le dos.',
        muscleGroup: 'Fessiers',
        secondaryMuscles: ['Dos', 'Épaules', 'Abdominaux'],
        type: ExerciseType.CARDIO,
        equipment: Equipment.KETTLEBELL,
      },
    }),
  ]);

  const workoutUser = await prisma.workout.create({
    data: { userId: user.id },
  });

  await prisma.workoutExercise.createMany({
    data: [
      {
        workoutId: workoutUser.id,
        exerciseId: exercises[0].id,
        duration: 45,
        sets: 4,
        reps: 8,
      },
      {
        workoutId: workoutUser.id,
        exerciseId: exercises[2].id,
        duration: 30,
        sets: 3,
        reps: 10,
      },
      {
        workoutId: workoutUser.id,
        exerciseId: exercises[3].id,
        duration: 20,
        sets: 3,
        reps: 8,
      },
    ],
  });

  const workoutBob = await prisma.workout.create({
    data: { userId: bob.id },
  });

  await prisma.workoutExercise.createMany({
    data: [
      {
        workoutId: workoutBob.id,
        exerciseId: exercises[1].id,
        duration: 60,
        sets: 5,
        reps: 5,
      },
      {
        workoutId: workoutBob.id,
        exerciseId: exercises[11].id,
        duration: 15,
        sets: 3,
        reps: 20,
      },
      {
        workoutId: workoutBob.id,
        exerciseId: exercises[14].id,
        duration: 30,
        sets: 4,
        reps: 12,
      },
    ],
  });

  const workoutAlice = await prisma.workout.create({
    data: { userId: alice.id },
  });

  await prisma.workoutExercise.createMany({
    data: [
      {
        workoutId: workoutAlice.id,
        exerciseId: exercises[4].id,
        duration: 25,
        sets: 3,
        reps: 12,
      },
      {
        workoutId: workoutAlice.id,
        exerciseId: exercises[9].id,
        duration: 20,
        sets: 3,
        reps: 15,
      },
    ],
  });

  console.log('Seeded:', {
    user,
    admin,
    exercises: exercises.length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
