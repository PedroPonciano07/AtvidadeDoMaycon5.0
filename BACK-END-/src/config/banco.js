import sql from 'mssql';
import dotenv from 'dotenv';

// Carrega as informacoes do arquivo .env
dotenv.config();

// Configuracoes para conectar ao SQL Server
const configuracaoBanco = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    port: Number(process.env.DB_PORT) || 1433,
    database: process.env.DB_NAME || 'APIEventos',

    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Faz a conexao com o banco de dados
export async function conectarBanco() {
    try {
        const conexao = await sql.connect(configuracaoBanco);

        console.log('Conectado ao SQL Server com sucesso!');

        return conexao;
    } catch (erro) {
        console.log('Erro ao conectar com o SQL Server:');
        console.log(erro.message);

        throw erro;
    }
}

// Deixa o sql disponivel para usar os tipos de dados nas consultas
export { sql };