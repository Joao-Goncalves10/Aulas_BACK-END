const produtoRepository = require("./produtoRepository")

class ProdutoService {
    async listarProduto() {
        // Importante: O Service chama o Repository para buscar os dados brutos
        return await produtoRepository.listarProdutos()
    }

    async buscarProdutoPorId(id) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'Id inválido' }
        }
        const produto = await produtoRepository.buscarProdutoPorID(id)
        if (!produto) {
            throw { status: 404, mensagem: 'Produto não encontrado' }
        }
        return produto
    }

    async cadastrarProduto(dados) {
        const { nome, descricao, preco, categoria, disponibilidade } = dados

        // Validação de Presença: Garante que dados essenciais existam antes de chegar ao Banco
        if (!nome || !descricao || !preco || !categoria || disponibilidade === undefined) {
            throw {
                status: 400,
                mensagem: 'Nome, descrição, preço, categoria e disponibilidade são obrigatórios'
            }
        }

        // Validação de Tipo e Valor: Evita erros de lógica financeira ou de banco
        if (typeof preco !== 'number' || preco <= 0) {
            throw {
                status: 400,
                mensagem: 'Preço deve ser um número positivo'
            }
        }

        const novoProduto = {
            nome: nome.trim(), // Sanitização: remove espaços inúteis no início e fim
            descricao: descricao.trim(),
            preco,
            categoria: categoria || null,
            disponibilidade: disponibilidade !== undefined ? disponibilidade : true
        }

        // CORREÇÃO: "ProdutoRepository" estava com 'P' maiúsculo, o nome da const é minúsculo
        const resultado = await produtoRepository.cadastrarProduto(novoProduto)

        return {
            sucesso: true,
            mensagem: 'Produto cadastrado com sucesso',
            resultado
        }
    }

    async atualizarProduto(id, dados) {
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'Id inválido' }
        }

        // Regra de Negócio: Não se atualiza o que não existe. Verificamos primeiro.
        const produtoExistente = await produtoRepository.buscarProdutoPorID(id)

        if (!produtoExistente) {
            throw { status: 404, mensagem: 'Produto não encontrado!' }
        }

        const produtoAtualizado = {}
        const { nome, descricao, preco, categoria, disponibilidade } = dados

        // Atualização Parcial: Só adiciona ao objeto o que foi de fato enviado
        if (nome !== undefined) produtoAtualizado.nome = nome.trim()
        if (descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        
        if (preco !== undefined) {
            if (typeof preco !== 'number' || preco <= 0) {
                throw { status: 400, mensagem: 'Preço deve ser um número positivo' }
            }
            produtoAtualizado.preco = preco
        }

        if (categoria !== undefined) produtoAtualizado.categoria = categoria
        if (disponibilidade !== undefined) produtoAtualizado.disponibilidade = disponibilidade

        // Segurança: Evita chamadas desnecessárias ao banco se o objeto estiver vazio
        if (Object.keys(produtoAtualizado).length === 0) {
            throw {
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
        if (!id || isNaN(id)) {
            throw { status: 400, mensagem: 'Id inválido' }
        }

        const idProduto = await produtoRepository.buscarProdutoPorID(id)

        if (!idProduto) {
            throw { status: 404, mensagem: 'Produto não encontrado.' }
        }

        // CORREÇÃO: No Repository o nome do método é apagarProduto
        await produtoRepository.apagarProduto(id)

        return {
            sucesso: true,
            mensagem: 'Produto apagado'
        }
    }
}

// Exportando como instância para facilitar o uso no Controller
module.exports = new ProdutoService()