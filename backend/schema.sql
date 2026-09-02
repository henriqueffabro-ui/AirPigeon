-- Ativa o suporte a chaves estrangeiras no SQLite
PRAGMA foreign_keys = ON;

-- 1. USUARIOS 
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

-- 2. PÁSSAROS 
CREATE TABLE IF NOT EXISTS passaros (
  id_passaro INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_passaro TEXT NOT NULL,
  descricao TEXT NOT NULL,
  -- O valor tem que ser em centavos: 500 -> R$5,00
  valor INTEGER NOT NULL
);

-- 3. PEDIDOS
CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_passaro INTEGER NOT NULL,
  id_usuario INTEGER NOT NULL,
  data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_passaro) REFERENCES passaros(id_passaro)
);