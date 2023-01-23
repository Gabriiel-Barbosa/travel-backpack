// Armazena o elemento do formulário com id 'novoItem' em uma constante
const form = document.getElementById("novoItem") 
// Armazena o elemento da lista com id 'lista' em uma constante
const lista = document.getElementById("lista")
// Armazena os itens armazenados no localStorage com a chave 'itens', convertendo-os de string para objeto JavaScript ou inicializa como um array vazio
const itens = JSON.parse(localStorage.getItem("itens")) || []  

// Itera sobre os itens e chama a função 'criaElemento' para cada um
itens.forEach( (elemento) => {    
    criaElemento(elemento)
} )

// Adiciona um evento de submit ao formulário, chamando a função anônima
form.addEventListener("submit", (evento) => {  
    // Previne o comportamento padrão do formulário de recarregar a página
    evento.preventDefault()

    // Armazena os elementos 'nome' e 'quantidade' do formulário em constantes
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    // Cria um objeto com as propriedades 'nome' e 'quantidade'
    const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
    }

    // Chama a função 'criaElemento' passando o itemAtual como argumento
    criaElemento(itemAtual)

    // Adiciona o itemAtual ao array itens
    itens.push(itemAtual)

    // Armazena o array itens no localStorage, convertendo-o de objeto JavaScript para string
    localStorage.setItem("itens", JSON.stringify(itens))

    // Limpa os campos 'nome' e 'quantidade' do formulário
    nome.value = ""
    quantidade.value = ""
})

// Função que cria um elemento 'li' com as propriedades do objeto 'item' e o adiciona à lista
function criaElemento(item) {  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)
}
