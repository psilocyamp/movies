
const apiURL = 'https://moviestack.onrender.com/api/movies'
const apiKey = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'



// Función para cargar las películas favoritas desde el Local Storage
const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites;
}

// Función para eliminar una película de los favoritos
const deleteFavs = (movieId) => {
  let favorites = loadFavorites();
  favorites = favorites.filter(id => id !== movieId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Inicializar la página de favoritos
const initFavorites = () => {
    const favorites = loadFavorites();   //cargo los scripts
    const allMovies = JSON.parse(localStorage.getItem('movies')) || []; //obtengo las pelis del local con la clave movies. parse para convertir en array
    const favoriteMovies = allMovies.filter(movie => favorites.includes(movie.id));//filtro las favs por id
    const favoritesContainer = document.getElementById('favoritesContainer'); //obtengo el contenedor de favs
    if (favoriteMovies.length === 0) {
      favoritesContainer.innerHTML = '<p class="text-center">No hay películas favoritas.</p>';
    } else {
      cardsCreator(favoriteMovies, favoritesContainer);
    }
  };

// Llamar a la función para cargar las películas favoritas cuando se cargue la página
document.addEventListener('DOMContentLoaded', initFavorites);


const cardsCreator = (arrayMovies, container) => {
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
    
    const deleteButtons = document.querySelectorAll('.favorite-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const movieId = button.getAttribute('data-id');
            deleteFavs(movieId);
            initFavorites(); // Volver a renderizar las tarjetas después de eliminar
        });
    });

  };
 
  
