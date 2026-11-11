import { conectarBanco, sql } from '../config/banco.js';

// Busca todas as inscricoes salvas no banco
export async function buscarInscricoes() {
    const conexao = await conectarBanco();

    // Primeiro busca os dados principais das inscricoes
    const resultadoInscricoes = await conexao.request().query(`
        SELECT
            id,
            dataConfirmacao
        FROM Inscricoes
        ORDER BY id DESC
    `);

    const inscricoes = resultadoInscricoes.recordset;

    // Para cada inscricao, busca os IDs dos eventos escolhidos
    for (let i = 0; i < inscricoes.length; i++) {
        const resultadoEventos = await conexao.request()
            .input('inscricaoId', sql.Int, inscricoes[i].id)
            .query(`
                SELECT eventoId
                FROM InscricaoEventos
                WHERE inscricaoId = @inscricaoId
            `);

        const idsEventos = [];

        for (let j = 0; j < resultadoEventos.recordset.length; j++) {
            idsEventos.push(resultadoEventos.recordset[j].eventoId);
        }

        // Mantem o mesmo formato que a API ja utilizava
        inscricoes[i].inscricoes = idsEventos;
        inscricoes[i].dataConfirmacao = inscricoes[i].dataConfirmacao.toISOString();
    }

    return inscricoes;
}

// Salva uma inscricao e os eventos escolhidos
export async function salvarInscricao(inscricao) {
    const conexao = await conectarBanco();

    // Cria primeiro o registro principal da inscricao
    const resultadoInscricao = await conexao.request()
        .query(`
            INSERT INTO Inscricoes (dataConfirmacao)
            OUTPUT INSERTED.id
            VALUES (GETDATE())
        `);

    const idInscricao = resultadoInscricao.recordset[0].id;

    // Depois salva cada evento relacionado a essa inscricao
    for (let i = 0; i < inscricao.inscricoes.length; i++) {
        const idEvento = inscricao.inscricoes[i];

        await conexao.request()
            .input('inscricaoId', sql.Int, idInscricao)
            .input('eventoId', sql.Int, idEvento)
            .query(`
                INSERT INTO InscricaoEventos (inscricaoId, eventoId)
                VALUES (@inscricaoId, @eventoId)
            `);
    }

    // Retorna os dados no mesmo formato usado antes
    const inscricaoSalva = {
        id: idInscricao,
        inscricoes: inscricao.inscricoes,
        dataConfirmacao: new Date().toISOString()
    };

    return inscricaoSalva;
}