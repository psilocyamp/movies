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
    "mx-[30px]",
    "sm:mx-[50px]",
    "md:mx-[80px]",
    "lg:mx-[120px]",
    "my-[50px]",
    "justify-center"
  );

  let cardsCreadasHTML = "";

  arrayMovies.forEach((movie) => {
    // itera sobre cada película en el array arrayMovies usando el método forEach
    const cardHTML = `
                    <article class="flex flex-col items-center text-center w-full sm:w-[45%] md:w-[30%] lg:w-[20%] bg-white rounded-lg shadow-md p-4 m-4">
                        <img src="${movie.image}" class="w-32 h-32 object-cover mt-2">
                        <h2 class="text-xl font-semibold">${movie.title}</h2>
                        <h3>${movie.tagline}</h3>
                        <p class="text-gray-600 flex-grow">${movie.overview}</p>
                    </article>
                `

    cardsCreadasHTML += cardHTML
  });
  container.innerHTML = cardsCreadasHTML
}

cardsCreator(movies);

//alto predefinido
//aprovechar espacio
//overflow
//favicon