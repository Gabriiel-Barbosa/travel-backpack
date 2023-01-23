// Recupera o formulário e a lista do HTML
const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")

// Recupera os itens salvos no LocalStorage ou cria um array vazio
const itens = JSON.parse(localStorage.getItem("itens")) || []

// Exibe os itens salvos na tela
itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

// Adiciona um evento de submit ao formulário para adicionar novos itens à lista
form.addEventListener("submit", (evento) => {
    // Previne o comportamento padrão de submissão do formulário
    evento.preventDefault()

    // Recupera os valores de nome e quantidade do formulário
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    // Verifica se o item já existe na lista
    const existe = itens.find( elemento => elemento.nome === nome.value )

    // Cria um objeto com os dados do item atual
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    // Se o item já existe, atualiza a quantidade e o LocalStorage
    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[existe.id] = itemAtual
    } else {
        // Senão, adiciona o item à lista e ao LocalStorage
        itemAtual.id = itens.length

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    // Atualiza o LocalStorage com a lista atualizada
    localStorage.setItem("itens", JSON.stringify(itens))

    // Limpa os campos do formulário
    nome.value = ""
    quantidade.value = ""
})

// Função para criar um novo elemento na tela representando o item
function criaElemento(item) {
    // Cria um novo elemento "li"
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    // Cria um elemento "strong" para exibir a quantidade do item
    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    
    // Adiciona o nome do item ao elemento "li"
    novoItem.innerHTML += item.nome

    // Adiciona o novo item à lista
    lista.appendChild(novoItem)
}

// Função para at
