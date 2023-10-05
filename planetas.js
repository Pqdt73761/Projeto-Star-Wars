// URL da página atual
let currentPageUrl = 'https://swapi.dev/api/planets/';

window.onload = async () => {
  try {
    // Carrega os personagens da URL atual ao carregar a página
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert('Erro ao carregar cards');
  }


  // Obtém referências aos botões "Próxima" e "Anterior"
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');

  // Adiciona ouvintes de evento para os botões
  nextButton.addEventListener('click', loadNextPage);
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadCharacters(url) {
  // Obtém a referência ao elemento de conteúdo principal
  const mainContent = document.getElementById('main-content');
  // Limpa o conteúdo anterior (caso haja)
  mainContent.innerHTML = '';

  try {
    // Faz uma solicitação à URL especificada e aguarda a resposta
    const response = await fetch(url);
    // Converte a resposta em JSON
    const responseJson = await response.json();

    // Itera pelos personagens na resposta
    responseJson.results.forEach((character) => {
      // Cria um elemento de cartão para cada personagem
      const card = document.createElement("div");
      card.style.backgroundImage =
        `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`;
      card.className = "cards";

      // Cria elementos para o nome do personagem
      const characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.name}`;

      // Anexa os elementos ao cartão e ao conteúdo principal
      characterNameBG.appendChild(characterName);
      card.appendChild(characterNameBG);

      card.onclick = () => {
        const modal = document.getElementById('modal');
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const characterImage = document.createElement("div");
        characterImage.style.backgroundImage =
          `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(/\D/g, "")}.jpg')`;
        characterImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Nome: ${character.name}`;

        const rotation_period = document.createElement("span");
        rotation_period.className = "character-details";
        rotation_period.innerText = `Período de rotação: ${character.rotation_period}`;

        const orbital_period = document.createElement("span");
        orbital_period.className = "character-details";
        orbital_period.innerText = `Período orbital: ${character.orbital_period}`;

        const climate = document.createElement("span");
        climate.className = "character-details";
        climate.innerText = `Clima: ${convertClimate(character.climate)}`;

        const gravity = document.createElement("span");
        gravity.className = "character-details";
        gravity.innerText = `Gravidade: ${character.gravity}`;

        const terrain = document.createElement("span");
        terrain.className = "character-details";
        terrain.innerText = `Terreno: ${character.terrain}`;

        const population = document.createElement("span");
        population.className = "character-details";
        population.innerText = `População: ${character.population}`;



        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(rotation_period);
        modalContent.appendChild(orbital_period);
        modalContent.appendChild(climate);
        modalContent.appendChild(gravity);
        modalContent.appendChild(terrain);
        modalContent.appendChild(population);
      };




      mainContent.appendChild(card)
    })

    // Obtém referências atualizadas aos botões "Próxima" e "Anterior"
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;

    // Torna o botão "Anterior" visível ou oculto com base na existência de uma página anterior
    backButton.style.visibility = responseJson.previous ? "visible" : "hidden";

    currentPageUrl = url


  } catch (error) {
    // Lida com erros ao carregar a próxima página
    console.log(error);
    alert('Erro ao carregar os planetas');
  }
}


// Função para carregar a próxima página de personagens
async function loadNextPage() {
  try {
    // Faz uma solicitação à URL da página atual
    const response = await fetch(currentPageUrl);
    // Converte a resposta em JSON
    const responseJson = await response.json();

    // Verifica se existe uma próxima página na resposta
    if (responseJson.next) {
      // Carrega os personagens da próxima página
      await loadCharacters(responseJson.next);
    }
  } catch (error) {
    // Lida com erros ao carregar a próxima página
    console.log(error);
    alert('Erro ao carregar a próxima página');
  }
}

// Função para carregar a página anterior de personagens
async function loadPreviousPage() {
  try {
    // Faz uma solicitação à URL da página atual
    const response = await fetch(currentPageUrl);
    // Converte a resposta em JSON
    const responseJson = await response.json();

    // Verifica se existe uma página anterior na resposta
    if (responseJson.previous) {
      // Carrega os personagens da página anterior
      await loadCharacters(responseJson.previous);
    }
  } catch (error) {
    // Lida com erros ao carregar a página anterior
    console.log(error);
    alert('Erro ao carregar a página anterior');
  }
}
function hiedModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden"
}

function convertClimate(climate) {
  const climas = {
    arid: "Árido",
    temperate: "Temperado",
    tropical: "Tropical",
    frozen: "Congelado",
    murky: "Turvo",
    aqueous: "Aquoso",
    barren: "Estéril",
    rocky: "Rochoso",
    grassy: "Gramado",
    desert: "Desértico",
    unknown: "desconhecido"
  };

  return climas[climate.toLowerCase()] || climate;
}




