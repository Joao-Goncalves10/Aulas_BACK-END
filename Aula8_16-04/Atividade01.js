//Exercício 1 - Usuários

app.get('/usuarios', async (req, res) => {
    const usuarios = await queryAsync("SELECT * FROM usuario")
    try {
        res.status(500).json({
            sucesso: true,
            mensagem: usuarios
    })
    } catch (erro) {
        res.status(404).json({
            sucesso: true,
            mensagem: 'Usuários não encontrados'
        })
    }
})

app.get('/usuarios/:id', async (req, res) => {
    const {id} = req.params;
    const usuarios = await queryAsync("SELECT * FROM usuario WHERE id = ?", [req.params.id])

    if (usuarios.length == 0) {
        return res.status(404).json({
            sucesso: false,
            mensagem: 'Usuário não encontrado'
    });
    } else {
        res.status(500).json({
            sucesso: true,
            mensagem: usuarios[0]
        });
    }
})

//Exercício 2 - Pedidos

app.post('/pedidos', async (req, res) => {
    const { cliente, valor } = req.body

    if (!cliente || typeof valor !== "number") {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Dados inválidos. Deve ser número"
        })
    }

    try {
        await queryAsync("INSERT INTO pedido (cliente, valor) VALUES (?, ?)", [cliente, valor])
        res.status(201).json({
            sucesso: true,
            mensagem: "Pedido criado"
        })
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao criar pedido"
        })
    }
})

//Exercício 3 - Salas

const validarDadosAtualizados(dados, res) => {
    if (salaExiste.length === 0) {
        res.status(404).json({
            sucesso: false,
            mensagem: "nenhum dado encontrado"
        })
        return false
    }
    return true
}

app.put('/salas/:id', async (req, res) => {
    const {id} = req.params
    const {dados} = req.body

    const salaExiste = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

    await queryAsync("UPDATE sala SET ? WHERE id = ?", [dados, id]);
    res.json({
        sucesso: true,
        mensagem: "Sala atualizada"
    })

    validarDadosAtualizados() {
        return
    }
})

app.delete('/salas/:id', async (req, res) => {
    const {id} = req.params

    const salaExiste = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

    if (salaExiste.length === 0) {
        return res.status(404).json({
            sucesso: false,
            mensagem: "nao há sala com esse ID"
        })
    }

    await queryAsync("DELETE FROM sala WHERE id = ?", [id])
    res.json({
        sucesso: true,
        mensagem: "Sala removida"
    })
})