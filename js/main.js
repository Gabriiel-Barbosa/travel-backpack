const  form = document.getElementById("novoItem")

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();

criaElemento(evento.target.elements['nome'].value, evento.target.elements['quantidade'].value)

})

function criaElemento(nome, quantidade){
    // Criando um elemento lista
    const novoItem = document.createElement('li')
    // Adicionando a classe no elemento criado 
    novoItem.classList.add("item")
    // Criando um elemento strong
    const numeroItem =document.createElement('strong')
    numeroItem.innerHTML = quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += nome

    const lista = document.getElementById('lista')

    lista.appendChild(novoItem)
} 