//1

let tittle= document.getElementById('datos')


//2

let principalTittle = "Fruits"
tittle.textContent= principalTittle
tittle.classList.add('text-3xl','font-bold', 'my-7')

//3

let changeColor= document.querySelectorAll('.color') //querySelectorAll devuelve una NodeList (similar a un array) que contiene todos esos elementos.

//for inicia un bucle que iterará a través de cada elemento en la NodeList changeColor

for (let i = 0; i < changeColor.length; i++) {   
    changeColor[i].classList.add('bg-orange-400')
    
}


//4

let footer = document.getElementById('footer')
footer.innerHTML+= ' Amparo Perez - Cohort 55'


//5
let mainElement = document.querySelector('main')

let newDiv= document.createElement('div')
newDiv.id=`myNewDiv`

mainElement.appendChild(newDiv)


// //6

// function cardsCreator (arrayOfCards) {
// const container= document.getElementById('card-container')
    
// arrayOfCards.forEach((card) => {
//     const cardHTML = `
//         <article class="completeCard">
//             <h2>${tittle}</h2>
//             <img src="${photo}">
//             <p>${textContent}</p>
//         </article>
//     `
// container.innerHTML+=cardHTML
// })
// }

// cardsCreator(frutas)





//7 //8

 const arrayFrutas = frutas

function cardsCreator (arrayFrutas) {
    const container= document.getElementById('myNewDiv')
     container.classList.add('flex','flex-wrap','mx-[120px]','my-[50px]', 'justify-center')//" bg-white rounded-lg shadow-md p-4 m-4 flex flex-col")  
    
     arrayFrutas.forEach((fruta)  => {
        const cardHTML = `
            <article class= "flex flex-col items-center text-center w-[20%] bg-white rounded-lg shadow-md p-4 m-4">
               <img src="${fruta.foto}"class="w-32 h-32 object-cover mt-2">
                <h2 class="text-xl font-semibold">${fruta.nombre}</h2>
               <p class="text-gray-600 flex-grow">${fruta.descripcion}</p>
            </article>
        `
    container.innerHTML+=cardHTML
    })
    }
    
    
    cardsCreator(frutas)



//9

const divMain= document.querySelector('main')
const segundoDiv= document.createElement('div')

segundoDiv.id= 'segundoDiv'
divMain.appendChild(segundoDiv)

const titulo= 'Frutas dulces'
const sweet= document.createElement('h2')
sweet.textContent= titulo
sweet.classList.add('text-2xl','font-bold', 'my-7')
segundoDiv.appendChild(sweet)


//10

function listaDulce (arrayFrutas) {
    const ul = document.createElement('ul')

    arrayFrutas.forEach ((frutas) => {
if (frutas.esDulce === true) {
    const li = document.createElement('li')
    li.textContent = frutas.nombre
    li.classList.add('list-disc')
    ul.appendChild(li)
}
    })

    const contenedor = document.getElementById('segundoDiv')
    contenedor.appendChild(ul)

}

listaDulce(frutas)