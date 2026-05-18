const pedidoRepository = require("./pedidoRepository")

class PedidoService {
    async listarPedido() {
        // Importante: O Service chama o Repository para buscar os dados brutos
        return await pedidoRepository.listarPedidos()
    }

    async buscarPedidoPorId(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'Id inválido' }
        }
        const pedido = await pedidoRepository.buscarPedidoPorID(id)
        if (!pedido) {
            throw { status: 404, mensagem: 'Pedido não encontrado' }
        }
        return pedido
    }

    async cadastrarPedido(dados) {
        const { cliente_id, data, total, status } = dados

        // Validação de Presença: Garante que dados essenciais existam antes de chegar ao Banco
        if (!cliente_id || !data || !total || !status) {
            throw {
                status: 400,
                mensagem: 'Cliente ID, data, total e status são obrigatórios'
            }
        }

        // Validação de Tipo e Valor: Evita erros de lógica financeira ou de banco
        if (typeof total !== 'number' || total <= 0) {
            throw {
                status: 400,
                mensagem: 'Total deve ser um número positivo'
            }
        }

        const novoPedido = {
            cliente_id,
            data: data.trim(), // Sanitização: remove espaços inúteis no início e fim
            total,
            status: status || 'pendente'
        }

        // CORREÇÃO: "PedidoRepository" estava com 'P' maiúsculo, o nome da const é minúsculo
        const resultado = await pedidoRepository.cadastrarPedido(novoPedido)

        return {
            sucesso: true,
            mensagem: 'Pedido cadastrado com sucesso',
            dados: resultado
        }
    }

    async atualizarPedido(id, dados) {
        // Validação básica
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'ID inválido' }
        }

        const pedidoExistente = await pedidoRepository.buscarPedidoPorID(id)
        if (!pedidoExistente) {
            throw { status: 404, mensagem: 'Pedido não encontrado' }
        }

        // Aqui você pode adicionar validações específicas para atualização
        const resultado = await pedidoRepository.atualizarPedido(id, dados)
        return {
            sucesso: true,
            mensagem: 'Pedido atualizado com sucesso',
            dados: resultado
        }
    }

    async deletarPedido(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'ID inválido' }
        }

        const resultado = await pedidoRepository.apagarPedido(id)
        if (!resultado) {
            throw { status: 404, mensagem: 'Pedido não encontrado' }
        }

        return {
            sucesso: true,
            mensagem: 'Pedido deletado com sucesso'
        }
    }
}

module.exports = new PedidoService()