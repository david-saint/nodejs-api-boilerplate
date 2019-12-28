import { Router } from 'express';

import { resolve } from '../../__init__/helpers';
import RegistrationController from '../../../controllers/RegistrationController';

const router = Router();

// Liat of accepted routes
router.get('/', (req, res) => res.json({ data: { message: '/api/v1' } }));

// USSD for registeriing farmers and what nots
router.post('/register', resolve(RegistrationController, 'registers'));

export default router;
