const express = require('express');
const { catchErrors } = require('./handlers/errorHandler');
const { register } = require('../controllers/RegistrationController');

const router = express.Router();

// Liat of accepted routes
router.get('/', (req, res) => res.send('hello'));

// USSD for registeriing farmers and what nots
router.post('/register', catchErrors(register));
