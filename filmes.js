// URL da página atual
let currentPageUrl = 'https://swapi.dev/api/films/';

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
        `url('https://starwars-visualguide.com/assets/img/films/${character.url.replace(/\D/g, "")}.jpg')`;
      card.className = "cards";

      // Cria elementos para o nome do personagem
      const characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.title}`;

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
          `url('https://starwars-visualguide.com/assets/img/films/${character.url.replace(/\D/g, "")}.jpg')`;
        characterImage.className = "character-image";

        const title = document.createElement("span");
        title.className = "character-details";
        title.innerText = `Nome: ${character.title}`;

        const release_date = document.createElement("span");
        release_date.className = "character-details";
        release_date.innerText = `Data de Lançamento: ${character.release_date}`;

        const episode_id = document.createElement("span");
        episode_id.className = "character-details";
        episode_id.innerText = `Episódio: ${character.episode_id}`;

        const director = document.createElement("span");
        director.className = "character-details";
        director.innerText = `Diretor: ${character.director}`;

        const producer = document.createElement("span");
        producer.className = "character-details";
        producer.innerText = `Produtor(es): ${character.producer}`;

       
        const opening_crawl = document.createElement("span");
        opening_crawl.className = "character-details";
        opening_crawl.innerText = `Sinopse: ${character.opening_crawl}`;

        
        modalContent.appendChild(characterImage);
        modalContent.appendChild(title);
        modalContent.appendChild(release_date);
        modalContent.appendChild(episode_id);
        modalContent.appendChild(director);
        modalContent.appendChild(producer);
        modalContent.appendChild(opening_crawl);
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



