
import express from 'express';
import cors from 'cors';

import eventoRoutes from './routes/eventoRoutes.js';
import inscricaoRoutes from './routes/inscricaoRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/eventos', eventoRoutes);
app.use('/api/inscricoes', inscricaoRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
