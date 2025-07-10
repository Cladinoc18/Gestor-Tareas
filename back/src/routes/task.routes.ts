import { Router } from 'express';
import { createTask, deleteTask, getCompleteDescription, getPriority, getTasks, getTasksSummary, updateTask } from '../controllers/task.controller';

const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

//funcionalidades IA
router.get('/tasks/summary', getTasksSummary);
router.get('/tasks/:id/priority', getPriority);
router.post('/tasks/complete', getCompleteDescription);


export default router;