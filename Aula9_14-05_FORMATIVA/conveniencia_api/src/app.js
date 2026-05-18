/*
GLOSSÁRIO DE TERMOS E COMANDOS JAVASCRIPT/NODE.JS USADOS NO PROJETO

- require: Função do Node.js para importar módulos ou arquivos. Ex: const express = require('express') importa o módulo Express.

- typeof: Operador unário que retorna uma string indicando o tipo do operando. Ex: typeof preco retorna 'number'.

- params: Geralmente req.params em Express, um objeto contendo parâmetros da URL. Ex: req.params.id acessa o ID da rota.

- stack: Propriedade de objetos Error que contém a pilha de chamadas (stack trace) onde o erro ocorreu, útil para debugging.

- throw: Palavra-chave para lançar uma exceção. Ex: throw new Error('Mensagem') interrompe a execução e passa o erro para o bloco catch.

- Object.keys: Método estático que retorna um array das chaves enumeráveis de um objeto. Ex: Object.keys(dados) retorna ['nome', 'preco'].

- async: Palavra-chave para declarar uma função assíncrona, permitindo o uso de await.

- await: Palavra-chave usada dentro de funções async para pausar a execução até que uma Promise seja resolvida.

- try/catch: Blocos para tratamento de erros. try executa código que pode falhar, catch captura e trata o erro.

- module.exports: Propriedade do Node.js para exportar módulos. Ex: module.exports = new Classe() torna a instância disponível para importação.

- const: Palavra-chave para declarar constantes, variáveis que não podem ser reatribuídas.

- let: Palavra-chave para declarar variáveis com escopo de bloco.

- for...of: Laço para iterar sobre iteráveis (arrays, strings, etc.). Ex: for(const [key, value] of Object.entries(obj))

- Object.entries: Método que retorna um array de pares [chave, valor] de um objeto.

- Array.join: Método que junta elementos de um array em uma string, separados por um delimitador. Ex: campos.join(', ')

- pool.query: Método de bibliotecas como mysql2 para executar queries SQL no banco de dados.

- SET ?: Sintaxe do MySQL para inserir objetos diretamente em queries INSERT/UPDATE.

- affectedRows: Propriedade do resultado de queries UPDATE/DELETE indicando quantas linhas foram afetadas.

- status: Código HTTP de resposta. Ex: res.status(200) define o status da resposta.

- json: Método de resposta Express para enviar dados em formato JSON. Ex: res.json(dados)

- trim: Método de string que remove espaços em branco do início e fim.

Outros termos comuns:
- Middleware: Funções que processam requisições antes de chegarem às rotas finais.
- CRUD: Create, Read, Update, Delete - operações básicas de banco de dados.
- API: Application Programming Interface - interface para comunicação entre sistemas.
- REST: Representational State Transfer - estilo arquitetural para APIs web.
*/

//--------------------------------------------------------------------------------------------------

const express = require('express')
const app = express()

const routes = require('./index') // Assumindo que index.js contém as rotas

app.use(express.json()) // Middleware para parsear JSON no body das requisições

app.use('/', routes) // Monta as rotas na raiz

// Porta do servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

module.exports = app;