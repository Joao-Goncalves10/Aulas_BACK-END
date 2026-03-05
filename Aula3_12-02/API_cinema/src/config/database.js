const mysql = require('mysql2')

require('dotenv').config()

// criando conexão com banco de dados, com o pool você cria várias conexões que pode ser usada várias vezes.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0 //lista de espera ilimitada quando coloco 0.
})// aqui ainda não criou conexão com o banco de dados, aqui estão as informações necessárias para poder ingressar.

module.exports = pool 