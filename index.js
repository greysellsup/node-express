const express = require('express')
const path = require('path')
const app = express()
const exphbs = require('express-handlebars')

const hbs =  exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))

app.get('/',(req, res)=> {
    res.render('index',{
        title: 'Home',
        isHome: true
    })
})

app.get('/add',(req, res)=> {
    res.render('add',{
        title: 'Add game',
        isAdd: true
    })
})

app.get('/games',(req, res)=> {
    res.render('games',{
        title: 'Games',
        isGames: true
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`Server is running on pont: ${PORT}`);
})