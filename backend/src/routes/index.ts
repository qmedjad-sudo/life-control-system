import { Router } from 'express';
import subjectsRouter from './subjects';
import habitsRouter from './habits';
import goalsRouter from './goals';
import tasksRouter from './tasks';

const router = Router();

router.use('/subjects', subjectsRouter);
router.use('/habits', habitsRouter);
router.use('/goals', goalsRouter);
router.use('/tasks', tasksRouter);

export default router;