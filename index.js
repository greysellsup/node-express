const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

// регистируем роуты
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const gamesRoutes = require('./routes/games')
const cardRoutes = require('./routes/card')

//подключили handlebars
const hbs =  exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// подключили статику (css)
app.use(express.static('public'))
app.use(express.urlencoded({extends: true}))//добавили middleware на обработку POST Запроса

// подключили роуты
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/games', gamesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`Server is running on pont: ${PORT}`);
})