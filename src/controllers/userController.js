const router = require('express').Router();

const userManager = require('../managers/userManager');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    await userManager.register({ username, password, repeatPassword });

    res.redirect('/users/login');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

module.exports = router;