const {Router} =  require('express')
const Game = require('../models/game')
const router = Router()

router.get('/',async (req, res) =>{
    const games =  await Game.getAll();
    console.log(games);
    res.render('games',{
        title: 'Games',
        isGames: true,
        games
    })
})

module.exports = router