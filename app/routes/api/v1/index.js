import { Router } from 'express';

import { resolve } from '../../__init__/helpers';
import TodoController from '../../../controllers/TodoController';

const router = Router();

// Liat of accepted routes
router.get('/', (req, res) => res.json({ data: { message: '/api/v1' } }));

// Route for listing all the todo lists
router.get('/todos', resolve(TodoController, 'index'));

// Route for creating a todo list
router.post('/todos/create', resolve(TodoController, 'create'));

// Route for getting a single todo
router.get('/todos/:id', resolve(TodoController, 'show'));

export default router;
