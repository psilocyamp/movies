//url params

const urlParams = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const findMovieById = (movies, id) => {
    return movies.find((movie) => movie.id === id);
  };
  return findMovieById(movies, id);
};
let llamamosFuncion = urlParams();

// Construir la estructura HTML utilizando plantillas de cadena
const detallesHTML = `
<div class="flex flex-col md:flex-row gap-8">
        <img src="${llamamosFuncion.image}" alt="Imagen de ${llamamosFuncion.title}" class="sm:w-[300px] h-auto sm:h-[150px] lg:w-[600px] lg:h-[300px] object-cover">

        <article class="w-full lg:w-[60%]">
            <h2 class="text-3xl font-bold mb-4">${llamamosFuncion.title}</h2>
            <p class="text-xl italic mb-4">${llamamosFuncion.tagline}</p>
            <p class="text-lg mb-4"><strong>Géneros:</strong> ${llamamosFuncion.genres.join(", ")}</p>
            <p class="text-base mb-4">${llamamosFuncion.overview}</p>
        </article>
    </div>

    <div class="w-full flex flex-wrap justify-around mt-8">
        <table class="table-auto w-full sm:w-[45%] md:w-[40%] lg:w-[30%] text-left mb-4 sm:mb-0">
            <tbody>
                <tr>
                    <td class="font-bold text-lg p-2 border border-gray-700">Idioma Original</td>
                    <td class="text-lg p-2 border border-gray-700">${llamamosFuncion.original_language}</td>
                </tr>
                <tr>
                    <td class="font-bold text-lg p-2 border border-gray-700">Fecha de Estreno</td>
                    <td class="text-lg p-2 border border-gray-700">${llamamosFuncion.release_date}</td>
                </tr>
                <tr>
                    <td class="font-bold text-lg p-2 border border-gray-700">Duración</td>
                    <td class="text-lg p-2 border border-gray-700">${llamamosFuncion.runtime} mins</td>
                </tr>
                <tr>
                    <td class="font-bold text-lg p-2 border border-gray-700">Estado</td>
                    <td class="text-lg p-2 border border-gray-700">${llamamosFuncion.status}</td>
                </tr>
            </tbody>
        </table>

        <table class="table-auto w-full sm:w-[45%] md:w-[40%] lg:w-[30%] text-left">
            <tbody>
                <tr>
                    <td class="font-bold text-lg p-2 border border-gray-700">Promedio de Votos</td>
                    <td class="text-lg p-2 border border-gray-700">${llamamosFuncion.vote_average}</td>
                </tr>
                <tr>
                    <td class="font-bold text-lg p-2 border border-gray-700">Presupuesto</td>
                    <td class="text-lg p-2 border border-gray-700">USD ${llamamosFuncion.budget.toLocaleString()}</td>
                </tr>
                <tr>
                    <td class="font-bold text-lg p-2 border border-gray-700">Ingresos</td>
                    <td class="text-lg p-2 border border-gray-700">USD ${llamamosFuncion.revenue.toLocaleString()}</td>
                </tr>
            </tbody>
        </table>
    </div>
`;

// Obtener el div de detalles y establecer su contenido HTML
const divDetalles = document.getElementById("moviedetailDIV");
divDetalles.innerHTML = detallesHTML;
