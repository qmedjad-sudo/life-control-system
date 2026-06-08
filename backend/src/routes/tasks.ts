import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

// GET all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { dueDate: 'asc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET task by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// POST create task
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, dueDate, status, domain, goalId, tags } = req.body;
    const task = await prisma.task.create({
      data: {
        name,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        status,
        domain,
        goalId,
        tags
      }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task' });
  }
});

// PUT update task
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, dueDate, status, domain, goalId, tags } = req.body;
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        status,
        domain,
        goalId,
        tags
      }
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// DELETE task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.task.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});

export default router;