const express = require('express')
const router = express.Router()

// CORREÇÃO: Removi a importação duplicada. 
// Mantenha apenas uma, preferencialmente combinando com o nome usado nas rotas abaixo.
const ProdutoController = require('../Repositorys/produtoController')

// O Router do Express serve para agrupar as rotas e manter o arquivo principal (app.js) limpo.

// Rota GET para listar tudo. O '/' aqui é relativo ao caminho definido no app.js (ex: /produtos)
router.get('/', ProdutoController.listarProduto)

// Rota GET com parâmetro de URL (:id). 
// Esse ':id' é o que permite o Controller acessar req.params.id
router.get('/:id', ProdutoController.buscarProdutoPorId)

// Rota POST para criação. O Controller receberá os dados através do req.body
router.post('/', ProdutoController.cadastrarProduto)

// Rota PUT para atualização. Combina o ID na URL com os dados de alteração no Body.
router.put('/:id', ProdutoController.atualizarProduto)

// Rota DELETE para remoção. Geralmente exige apenas o ID como parâmetro.
router.delete('/:id', ProdutoController.deletarProduto)

// Exporta o roteador para que ele possa ser "montado" no servidor principal.
module.exports = router