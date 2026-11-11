
import fs from 'fs';
import caminho from 'path';
import { fileURLToPath } from 'url';

const arquivo = fileURLToPath(import.meta.url);
const pasta = caminho.dirname(arquivo);

const arquivoInscricoes = caminho.join(pasta, 'inscricoes.json');

export function buscarInscricoes() {
    const dados = fs.readFileSync(arquivoInscricoes, 'utf-8');

    return JSON.parse(dados);
}

export function salvarInscricao(inscricao) {
    const inscricoes = buscarInscricoes();

    inscricoes.push(inscricao);

    fs.writeFileSync(
        arquivoInscricoes,
        JSON.stringify(inscricoes, null, 2)
    );

    return inscricao;
}
    