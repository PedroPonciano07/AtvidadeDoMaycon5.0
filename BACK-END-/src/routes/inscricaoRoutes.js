import express from 'express';

import {
    listarInscricoes,
    confirmarInscricoes
} from '../controllers/inscricaoController.js';

import { validarInscricao } from '../middlewares/validarInscricao.js';

const router = express.Router();

// GET /api/inscricoes
router.get('/', listarInscricoes);

// POST /api/inscricoes
router.post('/', validarInscricao, confirmarInscricoes);

export default router;