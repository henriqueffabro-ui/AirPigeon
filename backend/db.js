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