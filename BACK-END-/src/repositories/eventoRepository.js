import { conectarBanco, sql } from '../config/banco.js';

// Busca todos os eventos cadastrados no banco
export async function buscarEventos() {
    const conexao = await conectarBanco();

    const resultado = await conexao.request().query(`
        SELECT
            id,
            nome,
            CONVERT(VARCHAR(10), data, 23) AS data,
            horario,
            local,
            categoria,
            descricao,
            imagem
        FROM Eventos
        ORDER BY id
    `);

    return resultado.recordset;
}

// Procura um evento pelo seu ID
export async function buscarEventoPorId(id) {
    const conexao = await conectarBanco();

    const resultado = await conexao.request()
        .input('id', sql.Int, id)
        .query(`
            SELECT id, nome
            FROM Eventos
            WHERE id = @id
        `);

    return resultado.recordset[0];
}