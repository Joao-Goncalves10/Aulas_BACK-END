const pool = require('../config/database.js')

class produtoRepository {
    async listarProdutos() {
        const listaProdutos = await pool.query('SELECT * FROM produto')
        return listaProdutos
    }

    async buscarProdutoPorID(id) {
        const mostrarProduto = await pool.query('SELECT * FROM produto WHERE id = ?', [id])
        return mostrarProduto[0]
    }

    async cadastrarProduto(dadosProduto) {
        const resultadoCadastroProduto = await pool.query('INSERT INTO produto SET ?', [dadosProduto])
        return resultadoCadastroProduto
    }

    async atualizarProduto(id, dadosProduto) {
        const camposProduto = []
        const dadosProduto = []

        // tem duas variáveis e o for navegará para todas as entradas do produto
        for(const [key, value] of Object.entries(dadosProduto)) {
            camposProduto.push(`${key} = ?`)
            dadosProduto.push(value)
        }
        if(camposProduto.length === 0) return null

        dadosProduto.push(id)

        const query = `UPDATE produto SET ${camposProduto.join(',')} WHERE id = ?`
        const resultado = await pool.query(query, dadosProduto)

        return resultado.affectedRows //valida se houve alteração
    }

    async apagarProduto(id, dadosProduto) {
        await pool.query('DELETE FROM produto WHERE id: ?', [id])
        return true
    }
}

module.exports = new produtoRepository()