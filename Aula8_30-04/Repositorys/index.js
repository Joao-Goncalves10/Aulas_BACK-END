const express = require('express')
const router = express.Router()

const produtoRoutes = require('./produtoRoutes')
const pedidoRoutes = require('./pedidoRoutes')

router.get('/', (req, res) => {
    res.json({
        mensagem: 'API Sabor Digital',
        versao: '5.0.8'
    })
})

router.use('/produtos', produtoRoutes)
router.use('/pedidos', pedidoRoutes)