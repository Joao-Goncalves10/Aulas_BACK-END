// importação das bibliotecas ou dos módulos aqui dentro.

const pool = require('./config/database')
const app = require('./app')

const PORT = 3000

//criando conexão
pool.getConnection((err, connection) => {
    if(err){
        console.error('Erro ao conectar ao banco: ', err) // trás informação sobre o erro, ele já é mais voltado para erros no geral.
        process.exit(1)
    }
    console.log('Conectado ao MySQL!')
    connection.release()
})

app.listen(PORT, () =>{
    console.log('Servidor Rodando!')
})