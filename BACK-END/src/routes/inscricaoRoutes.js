
import express from 'express';

import {
    listarInscricoes,
    confirmarInscricoes
} from '../controllers/inscricaoController.js';

import { validarInscricao } from '../middlewares/validarInscricao.js';

const router = express.Router();

router.get('/', listarInscricoes);

router.post('/', validarInscricao, confirmarInscricoes);

export default router;
