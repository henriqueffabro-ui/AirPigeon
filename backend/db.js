// Ler e escrever arquivos
const fs = require('fs');

// Achar caminhos dos arquivos
const path = require('path');

// Banco de dados SQLite e suas funções
const Database = require('better-sqlite3');

// Define o nome do ficheiro do banco de dados que será criado
const dbPath = path.join(__dirname, 'AirPigeon.db');

// Conecta ao banco de dados
const db = new Database(dbPath);

// Ativa foreign keys 
db.pragma('foreign_keys = ON');

// Encontra o caminho do arquivo schema.sql
const schemaPath = path.join(__dirname, 'schema.sql');
// Lê o conteúdo do schema.sql
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

// Executa todo o script SQL
db.exec(schemaSql);

// Conecta o banco de dados para ser usado em outros arquivos
module.exports = db;

// Checa se já existe algum registro na tabela
const count = db.prepare('SELECT COUNT(*) as total FROM passaros').get().total;

// Se não houver registros, insere os dados iniciais
if (count === 0) {
const stmt = db.prepare(`
  INSERT INTO passaros (nome_passaro, descricao, valor) VALUES 
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?),
    (?, ?, ?)
`);

stmt.run(
  'Pena-Veloz', 'Pontual, focado e super rápido. Ideal para entregas urgentes de até 10km.', '2500',
  'Sombra', 'Discreto, silencioso e cauteloso. Perfeito para mensagens confidenciais.', '4000',
  'Aventureiro', 'Sociável, destemido e resistente a tempestades. Adora voos longos.', '3000',
  'Columbídeo', 'Barato.', '500',
  'Patriota Bird', 'Forte, resistente, veloz e dominante. O caçador ideal.', '8000',
  'Pterodactyl', 'Antiquado, fora de moda e vintage, mas funcional.', '2000'
);
}
