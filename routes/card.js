const {Router} = require('express')
const router = Router()
const Card = require('../models/card')
const Game = require('../models/game')

//получаем POST при добавлении в корзину и переходим в корзину
router.post('/add', async (req, res) => {
    const game = await Game.getById(req.body.id)
    console.log(game);
    await Card.add(game)
    res.redirect('/card')
})

//обрабатываем роут выводим данные
router.get('/', async (req,res) =>{
    const card = await Card.fetch();
    res.render('card',{
        tittle: 'Card',
        isCard: true,
        games: card.games,
        price: card.price
    })
})

module.exports = router