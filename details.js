const apiURL = "https://moviestack.onrender.com/api/movies";
const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

const mainElement = document.querySelector("main");

const newDiv = document.createElement("div");
newDiv.id = "myNewDiv";
mainElement.appendChild(newDiv);

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
      (pelicula) => (pelicula.image = `https://moviestack.onrender.com/static/${pelicula.image}`)
    );

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const movieId = new URLSearchParams(window.location.search).get("id");
    const movie = dataMovies.find((movie) => movie.id === movieId);

    const isFavorite = favorites.includes(movie.id);
    const starClass = isFavorite ? 'fa-solid text-yellow-400' : 'fa-regular';

    const detallesHTML =`
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <button class="favorite-button">
        <i data-id="${movie.id}" class="${starClass} fa-star fa-2x toggle p-4"></i>
      </button>
      <div class="flex flex-col md:flex-row gap-8 items-center">
        <img src="${movie.image}" alt="Imagen de ${movie.title}" class=" md:w-300 lg:w-600 h-auto object-cover rounded-lg">
        <article class="w-full lg:w-2/3">
          <h2 class="text-3xl font-bold mb-4">${movie.title}</h2>
          <p class="text-xl italic mb-4">${movie.tagline}</p>
          <p class="text-lg mb-4"><strong>Géneros:</strong> ${movie.genres.join(", ")}</p>
          <p class="text-base mb-4">${movie.overview}</p>
        </article>
      </div>
      <div class="flex flex-wrap justify-around mt-8">
        <div class="w-full lg:w-2/3">
          <h1 class="text-2xl mb-4">Detalles Específicos 🎬</h1>
          <table class="table-auto w-full text-left mb-4 bg-white shadow-md rounded-lg">
            <tbody>
              <tr>
                <td class="font-bold text-lg p-2 border border-gray-300">Idioma Original 🌎</td>
                <td class="text-lg p-2 border border-gray-300">${movie.original_language}</td>
              </tr>
              <tr>
                <td class="font-bold text-lg p-2 border border-gray-300">Fecha de Estreno 📅</td>
                <td class="text-lg p-2 border border-gray-300">${movie.release_date}</td>
              </tr>
              <tr>
                <td class="font-bold text-lg p-2 border border-gray-300">Duración ⏱️</td>
                <td class="text-lg p-2 border border-gray-300">${movie.runtime} mins</td>
              </tr>
              <tr>
                <td class="font-bold text-lg p-2 border border-gray-300">Estado 🎥</td>
                <td class="text-lg p-2 border border-gray-300">${movie.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w-full lg:w-2/3">
          <h1 class="text-2xl mb-4">Datos Financieros 💰</h1>
          <table class="table-auto w-full text-left bg-white shadow-md rounded-lg">
            <tbody>
              <tr>
                <td class="font-bold text-lg p-2 border border-gray-300">Promedio de Votos ⭐</td>
                <td class="text-lg p-2 border border-gray-300">${movie.vote_average}</td>
              </tr>
              <tr>
                <td class="font-bold text-lg p-2 border border-gray-300">Presupuesto 💸</td>
                <td class="text-lg p-2 border border-gray-300">USD ${movie.budget.toLocaleString()}</td>
              </tr>
              <tr>
                <td class="font-bold text-lg p-2 border border-gray-300">Ingresos 💵</td>
                <td class="text-lg p-2 border border-gray-300">USD ${movie.revenue.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  

    const divDetalles = document.getElementById("myNewDiv");
    divDetalles.innerHTML = detallesHTML;

    document.querySelectorAll('.toggle').forEach(star => {
      star.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita la propagación del evento al enlace
        const movieId = event.target.getAttribute('data-id');
        toggleFavorite(movieId);
        event.target.classList.toggle('fa-solid');
        event.target.classList.toggle('fa-regular');
      });
    });

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
