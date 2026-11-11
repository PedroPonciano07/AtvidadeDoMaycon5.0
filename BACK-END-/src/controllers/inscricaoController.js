import {
    buscarInscricoes,
    salvarInscricao
} from '../repositories/inscricaoRepository.js';

// Mostra todas as inscricoes que estao salvas no banco
export async function listarInscricoes(req, res) {
    try {
        const inscricoes = await buscarInscricoes();

        res.status(200).json(inscricoes);
    } catch (erro) {
        console.log('Erro ao buscar as inscricoes:', erro.message);

        res.status(500).json({
            mensagem: 'Nao foi possivel buscar as inscricoes.'
        });
    }
}

// Recebe os eventos escolhidos e confirma a inscricao
export async function confirmarInscricoes(req, res) {
    try {
        const idsEventos = req.body.inscricoes;

        const novaInscricao = {
            inscricoes: idsEventos
        };

        const inscricaoSalva = await salvarInscricao(novaInscricao);

        res.status(201).json({
            mensagem: 'Inscricoes confirmadas com sucesso!',
            inscricao: inscricaoSalva
        });
    } catch (erro) {
        console.log('Erro ao salvar a inscricao:', erro.message);

        res.status(500).json({
            mensagem: 'Nao foi possivel salvar a inscricao.'
        });
    }
}