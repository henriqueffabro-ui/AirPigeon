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

## Como rodar

```bash
cd backend
npm install
node server.js
```

Abra **http://localhost:3000**. O Express serve a pasta `frontend/` como estática, então o
`/` cai no `frontend/index.html`, e a API responde no mesmo endereço, em `/api/...`. O
banco `backend/pombos.db` é criado sozinho na primeira execução, a partir do `schema.sql`.

Cada um tem o seu banco local: o `.db` e as imagens de `uploads/` não são versionados.

## Requisitos

- Node.js
