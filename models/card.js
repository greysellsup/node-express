const fs = require('fs')
const path = require('path')

//путь до файла корзины
const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'card.json'
)

class Card {
  static async add(game) {
    const card = await Card.fetch(); // получаем игры из корзины
    const index = card.games.findIndex(item => item.id === game.id); //Находим индекс игры если она есть уже есть в корзине
    const selectedGame = card.games[index];

    if(selectedGame){
      //игра уже в корзине
      selectedGame.count++;
      card.games[index] = selectedGame;
    } else {
      //добавляем игру
      game.count = 1;
      card.games.push(game)
    }

    card.price += +game.price; //сумму стоимости игр
    
    //Записываем добавленную в корзину игру в JSON
    return new Promise((resolve, reject)=>{
      fs.writeFile(p, JSON.stringify(card), err => {
        err ? reject(err) : resolve()
      })
    })
  }

  //метод удаления игры
  static async remove(id){
    const card = await Card.fetch();
    const index = card.games.findIndex(item => item.id === id)
    const game = card.games[index];
    
    if(game.count === 1){
        card.games = card.games.filter(item => item.id != id)
    }else{
      card.games[index].count--;
    }

    card.price -= game.price //обновляем сумму в корзине

    //обновляем игры в JSON корзины
    return new Promise((resolve, reject)=>{
      fs.writeFile(p, JSON.stringify(card), err => {
        err ? reject(err) : resolve(card)
      })
    })
  }

  
  //получаем данные о играх в корзине
  static async fetch(){
    return new Promise((resolve, reject)=>{
      fs.readFile(p, 'utf-8',(err, content)=>{
        err ? reject(err) : resolve(JSON.parse(content))
      })
    })
  }
}

module.exports = Card