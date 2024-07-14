const mainElement = document.querySelector("main");

const newDiv = document.createElement("div");
newDiv.id = "myNewDiv";
mainElement.appendChild(newDiv);

//const arrayMovies = movies;

function cardsCreator(arrayMovies) {
  const container = document.getElementById("myNewDiv");
  container.classList.add(
    "flex",
    "flex-wrap",
    "mx-[10px]",
    "sm:mx-[20px]",
    "md:mx-[40px]",
    "lg:mx-[60px]",
    "my-[30px]",
    "justify-center"
  );

  let cardsCreadasHTML = "";

  arrayMovies.forEach((movie) => {
    // itera sobre cada película en el array arrayMovies usando el método forEach
    const cardHTML = `
                    <article class="flex flex-col items-center text-center w-full sm:w-[48%] md:w-[40%] lg:w-[30%] xl:w-[22%] bg-white rounded-lg shadow-md p-4 m-2 min-h-[300px]">
        <a href="moviedetail.html?id=${movie.id}" class="flex flex-col items-center">
          <img src="${movie.image}" class="w-32 h-32 object-cover mt-2">
          <h2 class="text-xl font-semibold mt-2">${movie.title}</h2>
          <h3 class="text-md font-medium text-gray-700 mt-1">${movie.tagline}</h3>
          <p class="text-gray-600 flex-grow mt-2">${movie.overview}</p>
        </a>
      </article>
                        
                `

    cardsCreadasHTML += cardHTML
  });
  container.innerHTML = cardsCreadasHTML
}

cardsCreator(movies);


//favicon


//filtrossss

let select = document.getElementById("filtro");
let searcher = document.getElementById("buscador");

// Aplicar clases de Tailwind CSS
select.classList.add(
  "p-2",
  "border",
  "rounded-md",
  "bg-white",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-blue-500",
  "focus:border-blue-500"
);

searcher.classList.add(
  "p-2",
  "border",
  "rounded-md",
  "bg-white",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-blue-500",
  "focus:border-blue-500"
);

let listaFiltradadeGeneros = (movies) => {
  const filtros = [...new Set(movies.flatMap(movie => movie.genres))].toSorted();
  return filtros;
};

let genresList = listaFiltradadeGeneros(movies);
select.innerHTML = `<option value="all">All</option>`; // Añadir opción "All" predeterminada
genresList.forEach(genre => {
  select.innerHTML += `<option value="${genre}">${genre}</option>`;
});

let listaFiltradaPorGeneros = (array, valor) => {
  let filtradosPorGenero = [];
  if (valor === "all") {
    filtradosPorGenero = array;
  } else {
    filtradosPorGenero = array.filter(movie => movie.genres.includes(valor));
  }
  return filtradosPorGenero;
};

let listaFiltradaPorNombre = (array, valor) => {
  let filtradordeBusqueda = array.filter(movie => movie.title.toLowerCase().includes(valor.toLowerCase()));
  return filtradordeBusqueda;
};

searcher.addEventListener('input', (event) => {
  event.preventDefault();
  let buscador = event.target.value;
  let input = listaFiltradaPorNombre(movies, buscador);
  let filtratotal = listaFiltradaPorGeneros(input, select.value);
  cardsCreator(filtratotal);
});

select.addEventListener('change', (event) => {
  event.preventDefault();
  console.log(event.target.value);
  let genero = event.target.value;
  let input = listaFiltradaPorGeneros(movies, genero);
  let filtratotal = listaFiltradaPorNombre(input, searcher.value);
  cardsCreator(filtratotal);
});







