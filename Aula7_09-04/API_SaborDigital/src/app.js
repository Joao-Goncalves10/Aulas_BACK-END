const express = require('express')
const pool = require('./config/database') // puxando as informações da database.
    
const app = express()
app.use(express.json()) //tudo nos arquivos está trabalhando com arquivos json.

const queryAsync = (sql, values = []) => { //criação da função Async
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if(err) reject(err)
            else resolve(results)
        })
    })
}   

// 1.    GET /: Rota inicial de teste.
// app.get('/produtos', async (req, res) => {
//     try {
//         const produtos = await queryAsync('SELECT * FROM produto')

//         res.json({
//             sucesso: true,
//             dados: produtos,
//             total: produtos.length
//         })
//     } catch (erro) {
//         console.error('Erro ao listar produtos:', erro)
//         res.status(500).json({
//             sucesso: false,
//             mensagem: 'Erro ao listar produtos',
//             erro: erro.message,
//         })
//     }
// }) 

// 2. GET /produtos: Listar todos os produtos (ordenados por ID decrescente).
app.get('/produtos', async (req, res) => {
    try {
        const dados = await queryAsync('SELECT * FROM produto ORDER BY id DESC');
        
        res.json({ 
            sucesso: true,
            dados: dados,
            total: dados.length 
        });
    
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar produtos',
            erro: erro.message 
        });
    }
}); 

// 3.    GET /produtos/:id: Buscar um produto específico (validar se o ID é numérico).
app.get('/produtos/:id', async (req,res) => {
    try{
        const {id} = req.params
    
        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de produto inválido'
            })
        }
    
        const informações = await queryAsync('SELECT * FROM produto WHERE id = ?', [id]);
    
        if (informações.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Produto não encontrado'
            });
        }
    
        res.json({
            sucesso: true,
            dados: informações[0]
        });
    
    } catch (erro) {
        console.error('Erro ao encontrar produto', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao encontrar o produto',
            erro: erro.message,
        })
    }
})  

// 4.    POST /produtos: Cadastrar novo produto (validar campos obrigatórios e preço).
app.post('/produtos', async(req,res) => {
    try {
        const {nome, descricao, preco, disponivel} = req.body
    
        if (!nome || !preco) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nome e preço são obrigatórios.'
            })
        }
    
        if(typeof preco !== "number" || preco <= 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Preço deve ser positivo"
            })
        }
    
        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao ?? null,
            preco: preco,
            disponivel: disponivel
        }
    
        const resultado = await queryAsync('INSERT INTO produto SET ?', [novoProduto])
    
        res.status(201).json({
            sucesso: true,
            mensagem: 'Produto cadastrado com sucesso!',
            id: resultado.insertId
        })
    } catch (erro) {
        console.error('Erro ao salvar produto:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao salvar produto',
            erro: erro.message
        })
    }
})  

// 5.    PUT /produtos/:id: Atualizar produto (permitir atualização parcial e validar existência).
app.put('/produtos/:id', async (req,res) => {
    try {
        const {id} = req.params
        const {nome, descricao, preco, disponivel} = req.body
    
        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de produto inválido'
            }) 
        }
    
        const produtoExiste = await queryAsync('SELECT * FROM produto WHERE id = ?', [id])
    
        if(produtoExiste.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Produto não encontrado'
            })
        }
    
        const produtoAtualizado = {}
    
        if(nome !== undefined) produtoAtualizado.nome = nome.trim()
        if(descricao !== undefined) produtoAtualizado.descricao = descricao
        if(preco !== undefined){
            if(typeof preco !== "number" || preco <= 0){
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Preço deve ser positivo'
                })
            }
            produtoAtualizado.preco = preco
        }
        if(disponivel !== undefined) produtoAtualizado.disponivel = disponivel
    
        if(Object.keys(produtoAtualizado).length === 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nada para atualizar'
            })
        }
        await queryAsync('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado, id])
        res.json({
            sucesso: true,
            mensagem: 'Produto atualizado.'
        })
    } catch (erro) {
        console.error('Erro ao atualizar produto:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar produto.',
            erro: erro.message
        })
    }
})  

// 6.    DELETE /produtos/:id: Remover produto (validar existência antes de excluir).
app.delete('/produtos/:id', async (req,res) =>{
    try {
        const {id} = req.params
    
        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID produto inválido.'
            })
        }
    
        const produtoExiste = await queryAsync('SELECT * FROM produto WHERE id = ?', [id])
       
        if(produtoExiste.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Produto não encontrado.'
            })
        }
    
        await queryAsync('DELETE FROM produto WHERE id = ?', [id])
    
        res.status(200).json({
            sucesso: true,
            mensagem:'Produto apagado'
        })
    } catch (erro) {
        console.error('Erro ao apagar produto:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao apagar produto.',
            erro: erro.message
        })
    }
})  

module.exports = app