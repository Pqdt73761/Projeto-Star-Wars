// URL da página atual
let currentPageUrl = 'https://swapi.dev/api/vehicles/';

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
        `url('https://starwars-visualguide.com/assets/img/vehicles/${character.url.replace(/\D/g, "")}.jpg')`;
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
          `url('https://starwars-visualguide.com/assets/img/vehicles/${character.url.replace(/\D/g, "")}.jpg')`;
        characterImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Nome: ${character.name}`;

        const model = document.createElement("span");
        model.className = "character-details";
        model.innerText = `Modelo: ${character.model}`;

        const length = document.createElement("span");
        length.className = "character-details";
        length.innerText = `Comprimento: ${character.length}`;

        const max_atmosphering_speed = document.createElement("span");
        max_atmosphering_speed.className = "character-details";
        max_atmosphering_speed.innerText = `Velocidade: ${character.max_atmosphering_speed}`;

       
        const passengers = document.createElement("span");
        passengers.className = "character-details";
        passengers.innerText = `Passageiros: ${character.passengers}`;

        const cargo_capacity = document.createElement("span");
        cargo_capacity.className = "character-details";
        cargo_capacity.innerText = `Capacidade de Carga: ${character.cargo_capacity}`;



        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(model);
        modalContent.appendChild(length);
        modalContent.appendChild(max_atmosphering_speed);
        modalContent.appendChild(passengers);
        modalContent.appendChild(cargo_capacity);
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
    alert('Erro ao carregar as naves');
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
