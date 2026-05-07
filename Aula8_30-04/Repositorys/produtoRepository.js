const pool = require('../config/database.js')

class produtoRepository {
    // Lista todos os registros da tabela. Importante: em apps reais, use LIMIT para paginação.
    async listarProdutos() {
        const listaProdutos = await pool.query('SELECT * FROM produto')
        return listaProdutos
    }

    // Busca um produto específico. O retorno do pool costuma ser um array, por isso o [0].
    async buscarProdutoPorID(id) {
        const mostrarProduto = await pool.query('SELECT * FROM produto WHERE id = ?', [id])
        return mostrarProduto[0]
    }

    // O driver mysql/mysql2 permite passar um objeto direto usando 'SET ?'
    async cadastrarProduto(dadosProduto) {
        const resultadoCadastroProduto = await pool.query('INSERT INTO produto SET ?', [dadosProduto])
        return resultadoCadastroProduto
    }

    async atualizarProduto(id, dadosProduto) {
        const camposProduto = []
        const valoresParaQuery = [] // CORREÇÃO: Mudei o nome aqui para não conflitar com o parâmetro 'dadosProduto'

        // Itera sobre o objeto para criar uma query dinâmica (apenas o que foi enviado será atualizado)
        for(const [key, value] of Object.entries(dadosProduto)) {
            camposProduto.push(`${key} = ?`)
            valoresParaQuery.push(value)
        }
        
        // Se o objeto estiver vazio, interrompe para evitar erro de sintaxe SQL
        if(camposProduto.length === 0) return null

        // O ID deve ser o último elemento do array para casar com o "WHERE id = ?"
        valoresParaQuery.push(id)

        const query = `UPDATE produto SET ${camposProduto.join(',')} WHERE id = ?`
        const resultado = await pool.query(query, valoresParaQuery)

        // IMPORTANTE: affectedRows indica quantas linhas o banco realmente alterou
        return resultado.affectedRows 
    }

    // CORREÇÃO: Removido 'dadosProduto' que não era usado. 
    // SQL correto usa '=' e não ':' para comparação.
    async apagarProduto(id) {
        const resultado = await pool.query('DELETE FROM produto WHERE id = ?', [id])
        return resultado.affectedRows > 0 // Retorna true se algo foi deletado
    }
}

module.exports = new produtoRepository()