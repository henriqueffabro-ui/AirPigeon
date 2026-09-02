const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const { exigeLogin } = require('../middlewares/auth');
const router = express.Router();

//POST /cadastro
router.post('/cadastro', (req, res) => {
    const {nome, email, senha} = req.body || {}; // se req.boddy or undefined, usa um objeto vazio no lugar

    // valida campos vazios (o if(empty) da spec do cadastro.php)
    if (!nome || !email || !senha) {
        return res.status(400).send({error: 'Preencha todos os campos!'})
    }

    // hasheia a senha antes de guardar
    const hashedPassword = bcrypt.hashSync(senha, 10);

    try {
        const info = db.prepare(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)'
        ).run(nome, email, hashedPassword);

        // deu certo => responde 201 (criado) com o id novo
        res.status(201).json({ id: info.lastInsertRowid });
    }
    // CATCH => "se falhou" la em cima, o erro cai na variavel e
    catch (e) {
        if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({ error: 'Email já cadastrado!' });
        }
        //qualquer outro erro que a gente nao previu estoura nao esconde o bug
        throw e;
    }
});

// POST /login
router.post('/login', (req, res) => {
    const { email, senha } = req.body || {};

    if (!email || !senha) {
        return res.status(400).json({
            error: 'Preencha todos os campos.'
        });
    }

    const usuario = db.prepare(
        'SELECT * FROM usuarios WHERE email = ?'
    ).get(email);

    if (!usuario) {
        return res.status(401).json({
            error: 'Email ou senha inválidos.'
        });
    }

    // Compara senha com hash armazenado no banco de dados
    const senhaCorreta = bcrypt.compareSync(
        senha,
        usuario.senha
    );

    if (!senhaCorreta) {
        return res.status(401).json({
            error: 'Email ou senha inválidos.'
        });
    }

    // Cria a sessão
    req.session.usuarioId = usuario.id;
    req.session.nome = usuario.nome;
    req.session.foto_perfil = usuario.foto_perfil;

    res.status(200).json({
        message: 'Login realizado com sucesso!',
        id: usuario.id,
        nome: usuario.nome,
        foto_perfil: usuario.foto_perfil
    });
});

// POST /logout -> destroi a sessao
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Falha ao realizar o logout.' });
        }
        // limpa o cookie velho no navegador ('connect.sid' e o nome padrao do express-session)
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Logout realizado com sucesso!' });
    });
});

// GET /me -> rota protegida: so responde se exigeLogin deixar passar.
// o front usa pra saber quem esta logado.
router.get('/me', exigeLogin, (req, res) => {
    res.json({ id: req.session.usuarioId,
        nome: req.session.nome,
        foto_perfil: req.session.foto_perfil
    });
});
    


module.exports = router;