import { buscarEventoPorId } from '../repositories/eventoRepository.js';

// Confere se os IDs enviados existem antes de salvar a inscricao
export async function validarInscricao(req, res, next) {
    try {
        const inscricoes = req.body.inscricoes;

        // Verifica se foi enviada uma lista de eventos
        if (!Array.isArray(inscricoes)) {
            res.status(400).json({
                mensagem: 'Envie uma lista com os IDs dos eventos.'
            });
        } else if (inscricoes.length === 0) {
            res.status(400).json({
                mensagem: 'Informe pelo menos um evento para inscricao.'
            });
        } else {
            let dadosValidos = true;

            // Verifica cada ID enviado
            for (let i = 0; i < inscricoes.length; i++) {
                const idEvento = inscricoes[i];

                if (!Number.isInteger(idEvento)) {
                    dadosValidos = false;
                } else {
                    const evento = await buscarEventoPorId(idEvento);

                    if (!evento) {
                        dadosValidos = false;
                    }
                }
            }

            if (dadosValidos === false) {
                res.status(400).json({
                    mensagem: 'Um ou mais eventos informados nao existem ou possuem ID invalido.'
                });
            } else {
                next();
            }
        }
    } catch (erro) {
        console.log('Erro ao validar a inscricao:', erro.message);

        res.status(500).json({
            mensagem: 'Nao foi possivel validar os eventos.'
        });
    }
}