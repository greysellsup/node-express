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