import { Router } from 'express';

import { catchErrors } from './__init__/handlers';
import RegistrationController from '../controllers/RegistrationController';

const router = Router();

// Liat of accepted routes
router.get('/', (req, res) => res.send('hello'));

// USSD for registeriing farmers and what nots
router.post('/register', catchErrors(RegistrationController.register));

export default router;
