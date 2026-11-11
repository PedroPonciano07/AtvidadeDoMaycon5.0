
import { buscarEventos } from '../repositories/eventoRepository.js';

export function validarInscricao(req, res, next) {
    const inscricoes = req.body.inscricoes;

    if (!Array.isArray(inscricoes) || inscricoes.length === 0) {
        return res.status(400).json({
            mensagem: "Informe os eventos para inscrição."
        });
    }

    const eventos = buscarEventos();

    for (let i = 0; i < inscricoes.length; i++) {
        const id = inscricoes[i];

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                mensagem: "ID de evento inválido."
            });
        }

        const evento = eventos.find(item => item.id === id);

        if (!evento) {
            return res.status(400).json({
                mensagem: "Evento não encontrado."
            });
        }
    }

    next();
}
