import 'dotenv/config';
import { db } from './index';
import { achievements } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  // Seed achievements
  const defaultAchievements = [
    {
      code: 'first_login',
      name: 'Primeiros Passos',
      description: 'Faça seu primeiro login no StudyAI',
      icon: '🎉',
      requirement: { type: 'login', count: 1 },
      points: 10,
    },
    {
      code: 'study_streak_7',
      name: 'Semana de Estudos',
      description: 'Estude por 7 dias consecutivos',
      icon: '🔥',
      requirement: { type: 'streak', days: 7 },
      points: 50,
    },
    {
      code: 'study_streak_30',
      name: 'Mês de Estudos',
      description: 'Estude por 30 dias consecutivos',
      icon: '📅',
      requirement: { type: 'streak', days: 30 },
      points: 200,
    },
    {
      code: 'flashcards_100',
      name: 'Mestre dos Flashcards',
      description: 'Revise 100 flashcards',
      icon: '🧠',
      requirement: { type: 'flashcards', count: 100 },
      points: 100,
    },
    {
      code: 'first_simulado',
      name: 'Primeiro Simulado',
      description: 'Complete seu primeiro simulado',
      icon: '📝',
      requirement: { type: 'simulado', count: 1 },
      points: 25,
    },
    {
      code: 'first_redacao',
      name: 'Escritor Iniciante',
      description: 'Envie sua primeira redação',
      icon: '✍️',
      requirement: { type: 'redacao', count: 1 },
      points: 25,
    },
    {
      code: 'tutor_chat_50',
      name: 'Conversador',
      description: 'Troque 50 mensagens com o Tiagão',
      icon: '💬',
      requirement: { type: 'tutor_messages', count: 50 },
      points: 75,
    },
    {
      code: 'study_hours_100',
      name: 'Dedicado',
      description: 'Acumule 100 horas de estudo',
      icon: '⏰',
      requirement: { type: 'study_hours', hours: 100 },
      points: 150,
    },
  ];

  for (const achievement of defaultAchievements) {
    await db.insert(achievements).values(achievement).onConflictDoNothing();
  }

  console.log('✅ Database seeded successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});