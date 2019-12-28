import { Router } from 'express';
import apiRoutes from './api';

const router = Router();

// Liat of accepted routes
router.get('/', (req, res) => res.send('hello'));
// Route group for all the API requests
router.use('/api', apiRoutes);

export default router;
