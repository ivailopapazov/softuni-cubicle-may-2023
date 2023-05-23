const router = require('express').Router();

const cubeManager = require('../managers/cubeManager');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body;

    cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    });

    res.redirect('/');
});

router.get('/:slug/details', (req, res) => {
    const cube = cubeManager.getOne(req.params.slug);

    if (!cube) {
        return res.redirect('/404');
    }
    
    res.render('details', { cube });
});

module.exports = router;