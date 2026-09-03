# AirPigeon

Website de aluguel de pássaros correio.

## Funcionalidades

Usuário:
- Cadastro e login
- Alugar pássaro

Administrador:
- Cadastrar pássaros
- Editar informações de pássaros


## Tecnologias

| Front | HTML, CSS, JS |
| Back | Node.js + Express |
| Banco | SQLite |

## Estrutura do repositório

```
backend/     → app Node/Express: server.js, db.js, rotas em routes/, schema.sql
frontend/    → o site: index.html, cadastro, login, pombos + css/ js/ imgs/
```

## Como preparar o backend

```bash
cd backend
npm install
npm install express
npm install express-session
npm install better-sqlite3
npm install bcrypt
node db.js
```

## Como rodar

```bash
cd backend
node server.js
```

Abra **http://localhost:3000**. O Express serve a pasta `frontend/` como estática, então o
`/` cai no `frontend/index.html`, e a API responde no mesmo endereço, em `/api/...`. O
banco `backend/pombos.db` é criado sozinho na primeira execução, a partir do `schema.sql`.

Cada um tem o seu banco local: o `.db`.

## Requisitos

- Node.js
