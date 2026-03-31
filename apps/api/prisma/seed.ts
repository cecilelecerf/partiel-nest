import {
  Difficulty,
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

  await prisma.training.deleteMany();
  await prisma.user.deleteMany();
  await prisma.userTraining.deleteMany();
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
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password,
      name: 'Bob',
      role: 'USER',
    },
  });
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  const trainings = await Promise.all([
    prisma.training.create({
      data: {
        name: 'Squat',
        description:
          'Exercice de base pour les jambes, debout avec une barre sur les épaules.',
        muscleGroup: 'Jambes',
        secondaryMuscles: ['Fessiers', 'Lombaires', 'Abdominaux'],
        type: ExerciseType.STRENGTH,
        difficulty: Difficulty.INTERMEDIATE,
        equipment: Equipment.BARBELL,
        tutorialUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
      },
    }),
    prisma.training.create({
      data: {
        name: 'Deadlift',
        description:
          "Soulevé de terre, exercice compound sollicitant l'ensemble du corps.",
        muscleGroup: 'Dos',
        secondaryMuscles: ['Jambes', 'Fessiers', 'Trapèzes', 'Abdominaux'],
        type: ExerciseType.STRENGTH,
        difficulty: Difficulty.ADVANCED,
        equipment: Equipment.BARBELL,
        tutorialUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
      },
    }),
    prisma.training.create({
      data: {
        name: 'Bench Press',
        description: 'Développé couché pour les pectoraux avec une barre.',
        muscleGroup: 'Pectoraux',
        secondaryMuscles: ['Triceps', 'Épaules'],
        type: ExerciseType.STRENGTH,
        difficulty: Difficulty.INTERMEDIATE,
        equipment: Equipment.BARBELL,
        tutorialUrl: 'https://www.youtube.com/watch?v=SCVCLChPQFY',
      },
    }),
    prisma.training.create({
      data: {
        name: 'Pull-up',
        description:
          'Traction à la barre fixe, excellent pour le dos et les biceps.',
        muscleGroup: 'Dos',
        secondaryMuscles: ['Biceps', 'Épaules'],
        type: ExerciseType.STRENGTH,
        difficulty: Difficulty.INTERMEDIATE,
        equipment: Equipment.BODYWEIGHT,
        tutorialUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
      },
    }),
    prisma.training.create({
      data: {
        name: 'Dips',
        description:
          'Exercice au poids du corps pour les triceps et les pectoraux.',
        muscleGroup: 'Triceps',
        secondaryMuscles: ['Pectoraux', 'Épaules'],
        type: ExerciseType.STRENGTH,
        difficulty: Difficulty.INTERMEDIATE,
        equipment: Equipment.BODYWEIGHT,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Rowing Haltères',
        description: 'Tirage unilatéral avec haltère pour le dos.',
        muscleGroup: 'Dos',
        secondaryMuscles: ['Biceps', 'Épaules'],
        type: ExerciseType.STRENGTH,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.DUMBBELL,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Développé Militaire',
        description: 'Exercice debout pour les épaules avec haltères ou barre.',
        muscleGroup: 'Épaules',
        secondaryMuscles: ['Triceps', 'Trapèzes'],
        type: ExerciseType.STRENGTH,
        difficulty: Difficulty.INTERMEDIATE,
        equipment: Equipment.DUMBBELL,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Fentes',
        description: 'Exercice unilatéral pour les jambes et les fessiers.',
        muscleGroup: 'Jambes',
        secondaryMuscles: ['Fessiers', 'Abdominaux'],
        type: ExerciseType.STRENGTH,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.DUMBBELL,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Hip Thrust',
        description:
          "Exercice d'isolation pour les fessiers avec barre ou haltère.",
        muscleGroup: 'Fessiers',
        secondaryMuscles: ['Ischio-jambiers', 'Lombaires'],
        type: ExerciseType.HYPERTROPHY,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.BARBELL,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Curl Biceps',
        description: 'Flexion des bras avec haltères pour isoler les biceps.',
        muscleGroup: 'Bras',
        secondaryMuscles: ['Avant-bras'],
        type: ExerciseType.HYPERTROPHY,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.DUMBBELL,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Gainage Planche',
        description:
          'Exercice isométrique pour renforcer la sangle abdominale.',
        muscleGroup: 'Abdominaux',
        secondaryMuscles: ['Lombaires', 'Épaules'],
        type: ExerciseType.STRENGTH,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.BODYWEIGHT,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Burpees',
        description: 'Exercice cardio full body très intense.',
        muscleGroup: 'Full Body',
        secondaryMuscles: ['Pectoraux', 'Jambes', 'Abdominaux'],
        type: ExerciseType.CARDIO,
        difficulty: Difficulty.INTERMEDIATE,
        equipment: Equipment.BODYWEIGHT,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Mountain Climbers',
        description:
          'Exercice cardio en position de planche avec mouvements de genoux.',
        muscleGroup: 'Abdominaux',
        secondaryMuscles: ['Épaules', 'Jambes'],
        type: ExerciseType.CARDIO,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.BODYWEIGHT,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Pompes',
        description: 'Exercice classique au poids du corps pour les pectoraux.',
        muscleGroup: 'Pectoraux',
        secondaryMuscles: ['Triceps', 'Épaules'],
        type: ExerciseType.STRENGTH,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.BODYWEIGHT,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Leg Press',
        description: 'Presse à cuisses en machine pour les jambes.',
        muscleGroup: 'Jambes',
        secondaryMuscles: ['Fessiers'],
        type: ExerciseType.HYPERTROPHY,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.MACHINE,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Leg Curl',
        description: 'Flexion des jambes en machine pour les ischio-jambiers.',
        muscleGroup: 'Jambes',
        secondaryMuscles: ['Fessiers'],
        type: ExerciseType.HYPERTROPHY,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.MACHINE,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Calf Raises',
        description: 'Élévation sur la pointe des pieds pour les mollets.',
        muscleGroup: 'Mollets',
        secondaryMuscles: [],
        type: ExerciseType.HYPERTROPHY,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.MACHINE,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Face Pull',
        description:
          'Tirage à la corde vers le visage pour les épaules et la coiffe des rotateurs.',
        muscleGroup: 'Épaules',
        secondaryMuscles: ['Trapèzes', 'Dos'],
        type: ExerciseType.MOBILITY,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.MACHINE,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Tirage Poulie Haute',
        description: 'Tirage vers le bas à la poulie pour le grand dorsal.',
        muscleGroup: 'Dos',
        secondaryMuscles: ['Biceps', 'Épaules'],
        type: ExerciseType.HYPERTROPHY,
        difficulty: Difficulty.BEGINNER,
        equipment: Equipment.MACHINE,
      },
    }),
    prisma.training.create({
      data: {
        name: 'Kettlebell Swing',
        description:
          'Balancé de kettlebell, exercice explosif pour les fessiers et le dos.',
        muscleGroup: 'Fessiers',
        secondaryMuscles: ['Dos', 'Épaules', 'Abdominaux'],
        type: ExerciseType.CARDIO,
        difficulty: Difficulty.INTERMEDIATE,
        equipment: Equipment.KETTLEBELL,
      },
    }),
  ]);

  await prisma.userTraining.createMany({
    data: [
      {
        userId: user.id,
        trainingId: trainings[0].id,
        duration: 45,
        sets: 4,
        reps: 8,
      },
      {
        userId: user.id,
        trainingId: trainings[2].id,
        duration: 30,
        sets: 3,
        reps: 10,
      },
      {
        userId: user.id,
        trainingId: trainings[3].id,
        duration: 20,
        sets: 3,
        reps: 8,
      },
      {
        userId: bob.id,
        trainingId: trainings[1].id,
        duration: 60,
        sets: 5,
        reps: 5,
      },
      {
        userId: bob.id,
        trainingId: trainings[11].id,
        duration: 15,
        sets: 3,
        reps: 20,
      },
      {
        userId: bob.id,
        trainingId: trainings[14].id,
        duration: 30,
        sets: 4,
        reps: 12,
      },
    ],
  });
  console.log('Seeded:', { alice, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
