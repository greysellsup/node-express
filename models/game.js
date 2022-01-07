const {v4: uuidv4} = require('uuid')
const fs = require('fs')
const path = require('path')

class Game {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4()
    }

    toJSON() {
        return {
          title: this.title,
          price: this.price,
          img: this.img,
          id: this.id
        }
      }

    
    async save() {
      const games = await Game.getAll();
      games.push(this.toJSON())

      return new Promise((resolve, reject) => {
        fs.writeFile(
          path.join(__dirname, '..', 'data', 'games.json'),
          JSON.stringify(games),
          (err) => {
            if (err) {
              
                reject(err)
            } else {
                resolve()
            }
          }
        )
      })
    }

    static getAll() {
      return new Promise((resolve, reject) => {
        fs.readFile(
          path.join(__dirname, '..', 'data', 'games.json'),
          'utf-8',
          (err, content) => {
            if (err) {
              reject(err)
            } else {
              resolve(JSON.parse(content))
            }
          }
        )
      })
    }

    static async getById(id) {
      const games = await Game.getAll();
      return games.find(game => game.id === id)
    }
}

module.exports = Game