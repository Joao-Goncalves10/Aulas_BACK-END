import express from "express"

const app = express()

app.use(express.json())

const musicas = [
    {
        id:20,
        titulo:'eternal sunshine',
        artista:'Ariana Grande',
        genero:'synth-pop',
        ano_publicacao:2024
    }
]

function buscarMusica(id) {
    return musicas.findIndex(m => {
        return m.id === Number(id)
    })
}

app.get("/", (req,res) => {
    res.status(200).send('CRUD Musicas')
})

app.get("/musicas", (req,res) => {
    res.status(200).json(musicas)
})

app.get("/musicas/:id", (req,res) => {
    const index = buscarMusica(req.params.id)
    res.status(200).json(musicas[index])
})

app.post("/musicas", (req,res) => {
    musicas.push(req.body)
    req.status(200).json(musicas)
})


export default app