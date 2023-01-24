const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

// Carrega os itens salvos no armazenamento local e os adiciona na lista HTML
itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

// Adiciona um evento de submit ao formulário para capturar quando é enviado
form.addEventListener("submit", (evento) => {
    // Previne o recarregamento da página
    evento.preventDefault()

    // Obtém os valores de "nome" e "quantidade" do formulário
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    // Verifica se o item já existe na lista
    const existe = itens.find( elemento => elemento.nome === nome.value )

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    // Se o item já existe, atualiza-o na lista
    // Caso contrário, adiciona-o a lista
    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    // Atualiza o armazenamento local com os itens atualizados
    localStorage.setItem("itens", JSON.stringify(itens))

    // Limpa os valores do formulário
    nome.value = ""
    quantidade.value = ""
})

// Cria um novo elemento na lista HTML
function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome

    // Adiciona um botão de deletar ao elemento
    novoItem.appendChild(botaoDeleta(item.id))

    // Adiciona o elemento na lista HTML
    lista.appendChild(novoItem)
}

// Atualiza um elemento na lista HTML com o novo valor de quantidade
function atualizaElemento(item) {
    // Seleciona o elemento na lista HTML pelo atributo "data-id"
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

// Cria um botão de deletar
function botaoDeleta(id) {
    // Cria um elemento HTML "button"
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    // Adiciona um evento de click ao botão para deletar o elemento
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

// Deleta um elemento da lista HTML e do armazenamento local
function deletaElemento(tag, id) {
    // Remove o elemento da lista HTML
    tag.remove()

    // Remove o item do array "itens"
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    // Atualiza o armazenamento local
    localStorage.setItem("itens", JSON.stringify(itens))
}
