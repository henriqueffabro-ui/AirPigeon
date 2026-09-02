const express=require("express");
const path=require("path");
const app=express();
const PORT=3000;

const session = require('express-session');

app.use(session({
    secret: 'forum-secret-key', //Chave secreta para assinar o ID da sessão
    resave: false, //Não salva a sessão se não houver alterações
    saveUninitialized: false //Não cria uma sessão até que algo seja armazenado nela
}));

//le o corpo JSON das requisicoes e joga em req.body (precisa vir antes das rotas)
app.use(express.json());

//rota de teste, serve pra conferir se o servidor esta no ar
app.get("/ping", (req, res)=> {
    res.send("pong");
});

//servir os arquivos do front (html, css, js)
//path.join com __dirname monta o caminho a partir deste arquivo,
//assim funciona de qualquer pasta que o node for rodado
app.use(express.static(path.join(__dirname, "../frontend")));


//tudo que chegar em /api cai no arquivo routes/auth.js (cadastro, login, logout)
app.use("/api", require("./routes/auth"));

//iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});