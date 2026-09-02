// middleware de autenticacao: a "catraca" das rotas privadas

// exigeLogin roda ANTES da rota de verdade. Se nao ha usuario na sessao,
// corta a requisicao com 401 
function exigeLogin(req, res, next) {
    if (!req.session.usuarioId) {
        return res.status(401).json({ error: 'Precisa estar logado.' });
    }

    // tem sessao => next() libera a requisicao pra seguir pra rota
    next();
}

// named export: no futuro (exigeAdmin etc) exporta junto, sem quebrar quem importa
module.exports = { exigeLogin };
