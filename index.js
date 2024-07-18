const apiURL = "https://moviestack.onrender.com/api/movies";
const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

const mainElement = document.querySelector("main");

const newDiv = document.createElement("div");
newDiv.id = "myNewDiv";
mainElement.appendChild(newDiv);

//aca obtengo los datos de la api

fetch(apiURL, {
  method: "GET",
  headers: {
    "x-api-key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    let dataMovies = data.movies;
    dataMovies.forEach(
      (pelicula) =>(pelicula.image = `https://moviestack.onrender.com/static/${pelicula.image}`)
    );

    let genresList = listaFiltradadeGeneros(dataMovies);
    select.innerHTML = `<option value="all">All</option>`;
    genresList.forEach((genre) => {
      select.innerHTML += `<option value="${genre}">${genre}</option>`;
    });

    searcher.addEventListener("input", (event) => {
      event.preventDefault();
      let buscador = event.target.value;
      let array = listaFiltradaPorNombre(dataMovies, buscador);
      let filtratotal = listaFiltradaPorGeneros(array, select.value);
      cardsCreator(filtratotal);
    });
    
    select.addEventListener("change", (event) => {
      event.preventDefault();
      let genero = event.target.value;
      let array = listaFiltradaPorGeneros(dataMovies, genero);
      let filtratotal = listaFiltradaPorNombre(array, searcher.value);
      cardsCreator(filtratotal);
    });
    localStorage.setItem('movies', JSON.stringify(dataMovies))
    cardsCreator(dataMovies);

  })
  .catch((error) => {
    console.log("Error fetching data", error);
  });

const toggleFavorite = (movieId) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.includes(movieId)) {
    favorites = favorites.filter(id => id !== movieId);
  } else {
    favorites.push(movieId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const cardsCreator = (arrayMovies) => {
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

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  arrayMovies.forEach((movie) => {
    const isFavorite = favorites.includes(movie.id);
    const starClass = isFavorite ? 'fa-solid text-yellow-400' : 'fa-regular';
    const cardHTML = `
      <article class="flex flex-col items-center text-center w-full sm:w-[48%] md:w-[40%] lg:w-[30%] xl:w-[22%] bg-white rounded-lg shadow-md p-6 m-2 min-h-[350px]">
        <button class="favorite-button" data-id="${movie.id}">
          <i data-id="${movie.id}" class="${starClass} fa-star fa-xl toggle"></i>
        </button>
        <a href="moviedetail.html?id=${movie.id}" class="flex flex-col items-center">
          <img src="${movie.image}" class="w-40 h-40 object-cover mt-4 rounded-lg">
          <h2 class="text-2xl font-semibold mt-4">${movie.title}</h2>
          <h3 class="text-lg font-medium text-gray-700 mt-2">${movie.tagline}</h3>
          <p class="text-gray-600 flex-grow mt-4">${movie.overview}</p>
        </a>
      </article>
    `;

    cardsCreadasHTML += cardHTML;
  });
  container.innerHTML = cardsCreadasHTML;
  

  document.querySelectorAll('.toggle').forEach(star => {
    star.addEventListener('click', (event) => {
      event.stopPropagation(); // Evita la propagación del evento al enlace
      const movieId = event.target.getAttribute('data-id');
      toggleFavorite(movieId);
      event.target.classList.toggle('fa-solid');
      event.target.classList.toggle('fa-regular');
    });
  });
};



// //filtrossss

let select = document.getElementById("filtro");
let searcher = document.getElementById("buscador");

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
  const filtros = [
    ...new Set(movies.flatMap((movie) => movie.genres)),
  ].toSorted();
  return filtros;
};



let listaFiltradaPorGeneros = (array, valor) => {
  let filtradosPorGenero = [];
  if (valor === "all") {
    filtradosPorGenero = array;
  } else {
    filtradosPorGenero = array.filter((movie) => movie.genres.includes(valor));
  }
  return filtradosPorGenero;
};

let listaFiltradaPorNombre = (array, valor) => {
  let filtradordeBusqueda = array.filter((movie) =>
    movie.title.toLowerCase().includes(valor.toLowerCase())
  );
  return filtradordeBusqueda;
};


