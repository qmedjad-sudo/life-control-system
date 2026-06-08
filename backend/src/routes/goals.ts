import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

// GET all goals
router.get('/', async (req: Request, res: Response) => {
  try {
    const goals = await prisma.goal.findMany({
      include: { tasks: true }
    });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
});

// GET goal by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const goal = await prisma.goal.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { tasks: true }
    });
    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }
    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch goal' });
  }
});

// POST create goal
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, domain, progress, deadline, status, description } = req.body;
    const goal = await prisma.goal.create({
      data: {
        name,
        domain,
        progress,
        deadline: deadline ? new Date(deadline) : null,
        status,
        description
      }
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create goal' });
  }
});

// PUT update goal
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, domain, progress, deadline, status, description } = req.body;
    const goal = await prisma.goal.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        domain,
        progress,
        deadline: deadline ? new Date(deadline) : null,
        status,
        description
      }
    });
    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update goal' });
  }
});

// DELETE goal
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.goal.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete goal' });
  }
});

export default router;