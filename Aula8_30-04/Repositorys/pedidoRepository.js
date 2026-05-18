const pool = require('../config/database.js')

class pedidoRepository {
    // Lista todos os registros da tabela. Importante: em apps reais, use LIMIT para paginação.
    async listarPedidos() {
        const listaPedidos = await pool.query('SELECT * FROM pedido')
        return listaPedidos
    }

    // Busca um pedido específico. O retorno do pool costuma ser um array, por isso o [0].
    async buscarPedidoPorID(id) {
        const mostrarPedido = await pool.query('SELECT * FROM pedido WHERE id = ?', [id])
        return mostrarPedido[0]
    }

    // O driver mysql/mysql2 permite passar um objeto direto usando 'SET ?'
    async cadastrarPedido(dadosPedido) {
        const resultadoCadastroPedido = await pool.query('INSERT INTO pedido SET ?', [dadosPedido])
        return resultadoCadastroPedido
    }

    async atualizarPedido(id, dadosPedido) {
        const camposPedido = []
        const valoresParaQuery = [] // CORREÇÃO: Mudei o nome aqui para não conflitar com o parâmetro 'dadosPedido'

        // Itera sobre o objeto para criar uma query dinâmica (apenas o que foi enviado será atualizado)
        for(const [key, value] of Object.entries(dadosPedido)) {
            camposPedido.push(`${key} = ?`)
            valoresParaQuery.push(value)
        }

        // Se o objeto estiver vazio, interrompe para evitar erro de sintaxe SQL
        if(camposPedido.length === 0) return null

        // O ID deve ser o último elemento do array para casar com o "WHERE id = ?"
        valoresParaQuery.push(id)

        const query = `UPDATE pedido SET ${camposPedido.join(',')} WHERE id = ?`
        const resultado = await pool.query(query, valoresParaQuery)

        // IMPORTANTE: affectedRows indica quantas linhas o banco realmente alterou
        return resultado.affectedRows
    }

    // CORREÇÃO: Removido 'dadosPedido' que não era usado.
    // SQL correto usa '=' e não ':' para comparação.
    async apagarPedido(id) {
        const resultado = await pool.query('DELETE FROM pedido WHERE id = ?', [id])
        return resultado.affectedRows > 0 // Retorna true se algo foi deletado
    }
}

module.exports = new pedidoRepository()