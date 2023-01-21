const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = []

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    criaElemento(nome.value, quantidade.value)
    
    // Deixa os formulários vazios
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(nome, quantidade) {
     // Criando um elemento lista
    const novoItem = document.createElement('li')
    // Adicionando a classe no elemento criado 
    novoItem.classList.add("item")
    // Criando um elemento strong
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = quantidade
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += nome

    lista.appendChild(novoItem)

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    itens.push(itemAtual)

    localStorage.setItem("item", JSON.stringify(itens))
}
