import express from 'express';
import cors from 'cors';

import { conectarBanco } from './config/banco.js';

import eventoRoutes from './routes/eventoRoutes.js';
import inscricaoRoutes from './routes/inscricaoRoutes.js';

const app = express();

// Permite que o frontend acesse a API
app.use(cors());

// Permite receber dados no formato JSON
app.use(express.json());

// Enderecos das rotas
app.use('/api/eventos', eventoRoutes);
app.use('/api/inscricoes', inscricaoRoutes);

// Primeiro conecta ao banco, depois inicia o servidor
async function iniciarServidor() {
    try {
        await conectarBanco();

        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    } catch (erro) {
        console.log('O servidor nao foi iniciado porque o banco nao conectou.');
    }
}

iniciarServidor();