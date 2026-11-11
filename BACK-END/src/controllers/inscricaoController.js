
import {buscarInscricoes,salvarInscricao} from '../repositories/inscricaoRepository.js';

export function listarInscricoes(req, res) {
    const inscricoes = buscarInscricoes();

    res.json(inscricoes);
}

export function confirmarInscricoes(req, res) {
    const ids = req.body.inscricoes;

    const inscricao = {
        id: Date.now(),
        inscricoes: ids,
        dataConfirmacao: new Date().toISOString()
    };

    salvarInscricao(inscricao);

    res.status(201).json({
        mensagem: "Inscrições confirmadas com sucesso!",
        inscricao: inscricao
    });
}
