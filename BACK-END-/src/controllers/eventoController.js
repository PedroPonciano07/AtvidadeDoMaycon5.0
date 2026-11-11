import { buscarEventos } from '../repositories/eventoRepository.js';

// Controla a rota que mostra os eventos
export async function listarEventos(req, res) {
    try {
        const eventos = await buscarEventos();

        res.status(200).json(eventos);
    } catch (erro) {
        console.log('Erro ao buscar os eventos:', erro.message);

        res.status(500).json({
            mensagem: 'Nao foi possivel buscar os eventos.'
        });
    }
}