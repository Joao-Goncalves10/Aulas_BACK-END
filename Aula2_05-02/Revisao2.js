// class Conta {
//     #saldo
//     constructor(){
//         this.#saldo = 0
//     }

//     depositar(valor){
//         if(valor < 0){
//             console.log('Valor inválido')
//         } else {
//             this.#saldo += valor
//         }
//     }

//     mostrarSaldo() {
//         console.log(`Seu saldo atual é: R$${this.#saldo.toFixed(2)}.`)
//     }
// }

// const conta1 = new Conta()

// conta1.depositar(-100)
// conta1.depositar(100)
// conta1.mostrarSaldo()

//---------------------------------------------------------------------------------------//

class Aluno {
    #nota
    constructor(){
        this.#nota = 0
    }

    definirNota(nota) {
        if(nota < 0 || nota > 10) {
            console.log('Valor inválido.')
        } else {
            this.#nota = nota
        }
    }

    mostrarNota(){
        console.log(`A nota é desse aluno é: ${this.#nota}`)
    }
}

const aluno1 = new Aluno()

aluno1.definirNota(-5)
aluno1.definirNota(14)
aluno1.definirNota(8)
aluno1.mostrarNota()