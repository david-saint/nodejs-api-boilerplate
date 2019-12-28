import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

// Liat of accepted routes
router.get('/', (req, res) => res.json({ data: { message: '/api' } }));
// Route group for all the version 1 routes
router.use('/v1', v1Routes);

export default router;
