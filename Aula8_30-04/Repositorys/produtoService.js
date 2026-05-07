const produtoRepository = require('../Repositorys/produtoRepository')

class produtoService {
    listarProdutos() {
        const produtos = await produtoRepository.listarProdutos()

        return{
            sucesso: true,
            dados: produtos,
            total: produtos.length
        }
    }

    async buscarProdutoPorId(id) {
        if (!id || isNaN(id)) {
            throw{
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const produto = await produtoRepository.buscarProdutoPorID(id)

        if(produto) {
            throw{
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        return {
            sucesso: true,
            dados: produto[0]
        }
    }
}