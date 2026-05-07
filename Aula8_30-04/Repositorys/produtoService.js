const produtoRepository = require('../Repositorys/produtoRepository')

class produtoService {
    // IMPORTANTE: Toda função que usa 'await' deve ser marcada como 'async'
    async listarProdutos() {
        // O Service solicita os dados ao Repository (Banco de Dados)
        const produtos = await produtoRepository.listarProdutos()

        return {
            sucesso: true,
            dados: produtos,
            total: produtos.length
        }
    }

    async buscarProdutoPorId(id) {
        // Validação de entrada: evita processar IDs que claramente não são números
        if (!id || isNaN(id)) {
            throw {
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const produto = await produtoRepository.buscarProdutoPorID(id)

        // CORREÇÃO: O erro deve ser lançado se o produto NÃO for encontrado (!produto)
        if (!produto) {
            throw {
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        return {
            sucesso: true,
            // Como o Repository geralmente retorna um array ou o objeto direto, 
            // ajustamos aqui para garantir o retorno do dado correto.
            dados: produto 
        }
    }
}

module.exports = new produtoService()