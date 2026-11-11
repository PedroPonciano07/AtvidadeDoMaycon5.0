import express from 'express';

import { listarEventos } from '../controllers/eventoController.js';

const router = express.Router();

// GET /api/eventos
router.get('/', listarEventos);

export default router;