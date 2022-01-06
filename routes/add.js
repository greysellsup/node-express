const {Router} = require('express')
const Game = require('../models/game')
const router = Router()

router.get('/', (req, res) =>{
    res.render('add',{
        title: 'Add game',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const game = new Game(req.body.title, req.body.price, req.body.img)
    await game.save();
    res.redirect('/games')
})

module.exports = router