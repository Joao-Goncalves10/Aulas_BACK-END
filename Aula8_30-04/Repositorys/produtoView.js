const produtoRepository = require("./produtoRepository")

class ProdutoService {
    async buscarProdutoPorId(id) {
        // Simulando uma busca em um banco de dados
    }

    async cadastrarProduto(dados) {
        // Simulando o cadastro de um produto
        const {nome, descricao, preco, categoria, disponibilidade} = dados

        if(!nome || !descricao || !preco || !categoria || disponibilidade === undefined) {
            throw{
                status: 400,
                mensagem: 'Nome, descrição e preço são obrigatórios'
            }
            
        }

        if(typeof preco !== 'number' || preco <= 0) {
            throw{
                status: 400,
                mensagem: 'Preço deve ser um numero positivo'
            }
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            categoria: categoria || null,
            disponibilidade: disponibilidade || true
        }

        const resultado = await ProdutoRepository.cadastrarProduto(novoProduto)

        return {
            sucesso: true,
            mensagem: 'Produto cadastrado com sucesso',
            resultado
        }
    }

    async atualizarProduto(id, dados) {
        if(!id || isNaN(id)) {
            throw{
                status: 400,
                mensagem: 'Id inválido'
            }
        }

        const produtoId = await produtoRepository.buscarProdutoPorID(id)

        if(!produtoId) {
            throw{
                status: 404,
                mensagem: 'Produto não encontrado!'
            }
        }

        const produtoAtualizado = {}

        const {nome, descricao, preco, categoria, disponibilidade} = dados

        if(nome !== undefined) produtoAtualizado.nome = nome.trim()

        if(descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        
        if(preco !== undefined) {
            if(typeof preco !== 'number' || preco <= 0) {
                throw {
                    status: 400,
                    mensagem: 'Preco deve ser um número positivo'
                }
            }
            produtoAtualizado.preco = preco
        }

        if(categoria !== undefined) produtoAtualizado.categoria = categoria

        if(disponibilidade !== undefined) produtoAtualizado.disponibilidade = disponibilidade

        if(Object.keys(produtoAtualizado).length == 0) {
            throw{
                status: 400,
                mensagem: 'Nenhum dado válido enviado para atualização'
            }
        }

        await produtoRepository.atualizarProduto(id, produtoAtualizado)
        return {
            sucesso: true,
            mensagem: 'Produto atualizado'
        }
    }

    async deletarProduto(id) {
        if(!id || isNaN(id)) {
            throw{
                status: 400,
                mensagem: 'Id inválido'
            }
        }

        const idProduto = await produtoRepository.buscarProdutoPorID(id)

        if(!idProduto) {
            throw {
                status: 400,
                mensagem: 'Produto não encontrado.'
            }
        }

        await produtoRepository.apagarProduto(id)

        return {
            sucesso: true,
            mensagem: 'Produto apagado'
        }
    }
}