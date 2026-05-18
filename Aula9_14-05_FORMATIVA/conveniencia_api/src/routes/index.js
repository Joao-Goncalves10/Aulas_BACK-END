const express = require('express');
const router = express.Router();
const ProdutoRoutes = require('./produtoRoutes');

router.use('/api/produtos', ProdutoRoutes);

module.exports = router;