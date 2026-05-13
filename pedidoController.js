const PedidoService = require('./pedidoService')

class PedidoController {
    async listarPedido(req, res) {
        try {
            // Intermedia a requisição chamando a regra de negócio no Service
            const resultado = await PedidoService.listarPedido()
            // Retorna o status 200 (OK) com a lista de pedidos em JSON
            res.status(200).json(resultado)
        } catch (erro) {
            // Bloco Catch: Captura qualquer erro no Service ou Banco e evita que o servidor caia
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || 'erro interno do servidor',
                erro: erro.stack || erro // Stack ajuda o desenvolvedor a rastrear a linha do erro
            })
        }
    }

    async buscarPedidoPorId(req, res) {
        try {
            // Extrai o ID da URL (ex: /pedido/5) através do req.params
            const id = req.params.id
            const resultado = await PedidoService.buscarPedidoPorId(id)
            res.status(200).json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || 'erro interno do servidor',
                erro: erro.stack || erro
            })
        }
    }

    async cadastrarPedido(req, res) {
        try {
            // req.body contém os dados enviados pelo cliente (JSON do pedido)
            const resultado = await PedidoService.cadastrarPedido(req.body)
            // 201: Status padrão para sucesso em criação de novos registros
            res.status(201).json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || 'erro interno do servidor',
                erro: erro.stack || erro
            })
        }
    }

    async atualizarPedido(req, res) {
        try {
            // Recebe tanto o ID (quem será alterado) quanto o Body (o que será alterado)
            const id = req.params.id
            const dados = req.body
            const resultado = await PedidoService.atualizarPedido(id, dados)
            res.status(200).json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || 'erro interno do servidor',
                erro: erro.stack || erro
            })
        }
    }

    async deletarPedido(req, res) {
        try {
            // Envia o ID para o service realizar a exclusão lógica ou física
            const resultado = await PedidoService.deletarPedido(req.params.id)
            res.status(200).json(resultado)
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || 'erro interno do servidor',
                erro: erro.stack || erro
            })
        }
    }
}

module.exports = new PedidoController()