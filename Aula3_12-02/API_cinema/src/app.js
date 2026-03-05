// vai ter conexão com o banco de dados

const express = require('express')
const pool = require('./config/database') // puxando as informações da database.

const app = express()

app.use(express.json()) //tudo nos arquivos está trabalhando com arquivos json.

app.get('/', (req,res) =>{
    res.send("API Cinema")
})

app.get('/filmes', (req,res) =>{
    pool.query('SELECT * FROM filmes', (err, results) => {
        res.json(results)
    })
})