import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

// GET all subjects
router.get('/', async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

// GET subject by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!subject) {
      res.status(404).json({ error: 'Subject not found' });
      return;
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subject' });
  }
});

// POST create subject
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, type, chapter, level, mastery } = req.body;
    const subject = await prisma.subject.create({
      data: {
        name,
        type,
        chapter,
        level,
        mastery
      }
    });
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create subject' });
  }
});

// PUT update subject
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, type, chapter, level, mastery, understood, exam, confidence, notes } = req.body;
    const subject = await prisma.subject.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        type,
        chapter,
        level,
        mastery,
        understood,
        exam,
        confidence,
        notes
      }
    });
    res.json(subject);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update subject' });
  }
});

// DELETE subject
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.subject.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Subject deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete subject' });
  }
});

export default router;