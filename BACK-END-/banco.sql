
-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS api_eventos;

-- Seleciona o banco
USE api_eventos;


-- Tabela de eventos
CREATE TABLE IF NOT EXISTS Eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data DATETIME NOT NULL,
    local VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    descricao TEXT,
    imagem TEXT
);


-- Tabela de inscricoes
CREATE TABLE IF NOT EXISTS Inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataConfirmacao DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- Tabela que relaciona inscricoes com eventos
CREATE TABLE IF NOT EXISTS InscricaoEventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    inscricaoId INT NOT NULL,
    eventoId INT NOT NULL,

    FOREIGN KEY (inscricaoId)
        REFERENCES Inscricoes(id)
        ON DELETE CASCADE,

    FOREIGN KEY (eventoId)
        REFERENCES Eventos(id)
        ON DELETE CASCADE,

    UNIQUE (inscricaoId, eventoId)
);


-- Cadastro dos eventos
INSERT INTO Eventos (nome, data, local, categoria, descricao, imagem)
VALUES
(
    'Festival de Musica',
    '2026-12-12 16:00:00',
    'Parque da Cidade',
    'Musica',
    'Um festival com varias apresentacoes musicais.',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900'
),
(
    'Feira de Tecnologia',
    '2026-11-22 09:00:00',
    'Centro de Convencoes',
    'Tecnologia',
    'Um evento para conhecer novidades da tecnologia.',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900'
),
(
    'Encontro de Empreendedores',
    '2026-12-05 10:00:00',
    'Auditorio Central',
    'Negocios',
    'Um encontro para compartilhar ideias e experiencias.',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900'
),
(
    'Workshop de Fotografia',
    '2026-11-29 14:00:00',
    'Espaco Criativo',
    'Workshop',
    'Uma atividade para aprender mais sobre fotografia.',
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900'
),
(
    'Corrida pela Saude',
    '2027-01-17 07:00:00',
    'Lago Municipal',
    'Esporte',
    'Uma corrida para incentivar a pratica de atividades fisicas.',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900'
),
(
    'Mostra de Arte',
    '2026-12-19 13:00:00',
    'Galeria Municipal',
    'Cultura',
    'Uma exposicao com diferentes trabalhos artisticos.',
    'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900'
);


-- Mostra os eventos cadastrados
SELECT * FROM Eventos;

-- Mostra as inscricoes
SELECT * FROM Inscricoes;

-- Mostra a relacao entre inscricoes e eventos
SELECT * FROM InscricaoEventos;
