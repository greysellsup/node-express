const {Router} =  require('express')
const Game = require('../models/game');
const { route } = require('./home');
const router = Router()

router.get('/',async (req, res) =>{

    const games =  await Game.getAll();

    res.render('games',{
        title: 'Games',
        isGames: true,
        games
    })
})

//Редирект на стр. редактировование игры.
router.get('/:id/edit', async (req, res)=>{
    if(!req.query.allow) {
        return res.redirect('/')
    }
    const game = await Game.getById(req.params.id)
    res.render('game-edit', {
        title: `Edit game ${game.title}`,
        game
    })
})

//обрабатываем POST запрос на редактирование игры
router.post('/edit', async (req, res)=>{
    await Game.update(req.body)
    res.redirect('/games')
})

//обрабатываем страницу отдельной игры
router.get('/:id', async (req, res)=>{
    const game = await Game.getById(req.params.id)
    res.render('game', {
        layout: 'game',
        title: `Game ${game.title}`,
        game
    })
})

module.exports = router