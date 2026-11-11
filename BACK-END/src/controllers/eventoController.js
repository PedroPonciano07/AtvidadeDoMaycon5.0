
import { buscarEventos } from '../repositories/eventoRepository.js';

export function listarEventos(req, res) {
    const eventos = buscarEventos();

    res.json(eventos);
}
