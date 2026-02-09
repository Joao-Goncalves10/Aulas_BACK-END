// class Pessoa {
//     constructor(nome, idade) {
//         this.nome = nome
//         this.idade = idade
//     }
//
//     apresentar(){
//         console.log(`Nome: ${this.nome}, Idade: ${this.idade}`)
//     }
// }
//
// const pessoa1 = new Pessoa('Celso', 26)
// pessoa1.apresentar()


//------------------------------------------------------------------------------------------------------//


// class Produto{
//     constructor(nome, preco) {
//         this.nome = nome
//         this.preco = preco
//     }
//
//     mostrarPreco(){
//         console.log(`Nome: ${this.nome}, Preço: ${this.preco.toFixed(2)}`)
//     }
// }
//
// const produto1 = new Produto('Cadeira', 300)
// produto1.mostrarPreco()


//------------------------------------------------------------------------------------------------------//


// class Funcionario{
//     constructor(nome){
//         this.nome = nome
//     }
// }
//
// class Gerente extends Funcionario{
//     constructor(nome, setor){
//         super(nome)
//         this.setor = setor
//     }
//
//     mostrarGerente(){
//         console.log(`Nome: ${this.nome}, Setor: ${this.setor}`)
//     }
// }
//
// const gerente1 = new Gerente('Celso', 'DF')
//
// gerente1.mostrarGerente()


//------------------------------------------------------------------------------------------------------//


// class Veiculo{
//     constructor(marca){
//         this.marca = marca
//     }
// }
//
// class Carro extends Veiculo{
//     constructor(marca, modelo){
//         super(marca)
//         this.modelo = modelo
//     }
//     marcaModelo(){
//         console.log(`Nome: ${this.marca}, Modelo: ${this.modelo}`)
//     }
// }
//
// const carro1 = new Carro('FIAT', 'Não Sei')
//
// carro1.marcaModelo()