const express = require('express');
const db = require('../db');
const { exigeLogin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', exigeLogin, (req, res) => {
    const passaros = db.prepare('SELECT * FROM passaros').all();
    res.json(passaros);
});

module.exports = router;