import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

// GET all habit entries
router.get('/', async (req: Request, res: Response) => {
  try {
    const habits = await prisma.habitEntry.findMany({
      orderBy: { date: 'desc' }
    });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
});

// GET habit entry by date
router.get('/:date', async (req: Request, res: Response) => {
  try {
    const date = new Date(req.params.date);
    const habit = await prisma.habitEntry.findUnique({
      where: { date }
    });
    if (!habit) {
      res.status(404).json({ error: 'Habit entry not found' });
      return;
    }
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habit' });
  }
});

// POST create or update habit entry
router.post('/', async (req: Request, res: Response) => {
  try {
    const { date, mathematics, philosophy, english, informatics, gym, sleep, water, organization, personalProject } = req.body;
    
    const habits = [mathematics, philosophy, english, informatics, gym, sleep, water, organization, personalProject];
    const score = (habits.filter(Boolean).length / 9) * 100;

    const habit = await prisma.habitEntry.upsert({
      where: { date: new Date(date) },
      update: {
        mathematics,
        philosophy,
        english,
        informatics,
        gym,
        sleep,
        water,
        organization,
        personalProject,
        score
      },
      create: {
        date: new Date(date),
        mathematics,
        philosophy,
        english,
        informatics,
        gym,
        sleep,
        water,
        organization,
        personalProject,
        score
      }
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save habit' });
  }
});

export default router;