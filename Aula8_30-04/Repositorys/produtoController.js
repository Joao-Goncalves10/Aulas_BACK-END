const ProdutoService = require('./produtoService')

class ProdutoController {
    async listarProduto(req, res) {
        try {
            const resultado = await ProdutoService.listarProduto()
            res.status(200).json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || 'erro interno do servidor',
                erro: erro.stack || erro
            })
        }
    }

    async buscarProdutoPorId(req, res) {
        try {
            const resultado = await ProdutoService.listarProduto()
            this.buscarProdutoPorId(req.params.id)
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || 'erro interno do servidor',
                erro: erro.stack || erro
            })
        }
    }

    async cadastrarProduto(req, res) {
        try {
            const resultado = await ProdutoService.cadastrarProduto()
            this.cadastrarProduto(req.body)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || 'erro interno do servidor',
                erro: erro.stack || erro
            })
        }
    }

    async atualizarProduto(req, res) {
        try {
            const resultado = await ProdutoService.atualizarProduto()
            this.atualizarProduto(req.params.id, req.body)
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || 'erro interno do servidor',
                erro: erro.stack || erro
            })
        }
    }

    async deletarProduto(req, res) {
        try {
            const resultado = await ProdutoService.deletarProduto()
            this.deletarProduto(req.params.id)
            res.json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || 'erro interno do servidor',
                erro: erro.stack || erro
            })
            
        }
    }
}

module.exports = new ProdutoController()