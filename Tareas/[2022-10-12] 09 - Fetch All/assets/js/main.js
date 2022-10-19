//Declaracion de variables logica
// "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
let pokemons = [];
let results = [];

//Declaracion de variables visuales
let pokeForm = null;
let pokeParty = null;
let pokeCards = null; 

//bind views
const bindElements = () => {
  pokeForm = document.querySelector("#pokemon-form");
  pokeParty = document.querySelector("#pokemon-party-section");
}

// Fetch first 151 pokemons information
const fetchResults = async () => {
  let _data = null;
  let _dataResult = [];
  try {
    const response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=151");
    _data = await response.json();

    if (response.ok){
      for (i in _data){
        _dataResult.push(_data[i]);
      }
    }
  } catch(error) {
    console.error(error);
  } finally {
    return _dataResult[3];
  }
}

// Fetch pokemon information
const fetchPokeInfo = async (url) => {
  let _data = null;
  let data = null
  try {
    let response = await fetch(url, {});
    // Getting the json object
    if (response.ok){
      _data = await response.json();
      data = castPokeData(_data);
    }
  } catch(error){
    console.error(error);
  } finally {
    return data;
  }
}

// Normalize stat names
const normalizeStats = (name) => {
  const _names = {
    "attack": "atk",
    "defense": "def",
    "special-attack": "spa",
    "special-defense": "spd"
  }

  return _names[name] || "";
}

// Cast pokemon information
const castPokeData = (data) => {
  return {
    identifier: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    height: data.height,
    weight: data.weight,
    types: data.types.map(type => type.type.name),
    stats: data.stats.reduce((result, stat) => {
      return {
        ...result, 
        [normalizeStats(stat.stat.name)]: stat.base_stat,
      }
    },{}),
  }
}

// Get the 151 pokemons and save them in the 'results' array
const getPokemons = async () => {
  let _pokemon;
  results = await fetchResults();

  results.forEach(async item => {
    _pokemon = await fetchPokeInfo(item.url);
    pokemons.push(_pokemon);
  })
  
  // Renderiza la nueva carta del pokemon en la pantalla
  renderPokemons();
}

const setFormListener = () => {
  pokeForm.addEventListener("submit", async e => {
    // Evita que ocurra el evento por defecto
    e.preventDefault();
    getPokemons();
  });
}

const deletePokemon = (identifier) => {
  let _target; 

  // Recorrer el arreglo para poder encontrar el pokemon con identifier recibido
  for (var i = 0; i < pokemons.length; i++){ 
    if (pokemons[i].identifier == identifier) {
      _target = i;
      break;
    } 
  }
  
  // Eliminar pokemon encontrado del arreglo de pokemons
  pokemons.splice(_target,1);
  // Volver a renderizar las cartas faltantes
  renderPokemons(); 
}

const createPokemonCard = (poke) => {
  const type = poke.types[0];
  console.log("Eestoy creando");
  return `
<article data-index=${poke.identifier} class="card ${type}">
  <figure class="trash-icon" id="trash-${poke.identifier}" onclick="deletePokemon(${poke.identifier})">
    <span class="material-symbols-outlined">
      delete
      </span>
  </figure>
  <figure id="pokemon">
    <img src=${poke.sprite} alt="Pokemon Sprite">
  </figure>
  <div class="info">
    <h4> ${poke.name} </h4>
    <p> # ${poke.identifier} </p>
    <p> Altura: ${poke.height} </p>
    <p> Peso: ${poke.weight} </p>
  </div>
  
  <div class="stats">
    <div class="stat">
      <p> HP: </p>
      <div class="bar">
        <div style="width: ${poke.stats.hp}%;"></div>
      </div>
    </div>
    
    <div class="stat">
      <p> ATK: </p>
      <div class="bar">
        <div style="width: ${poke.stats.atk}%;"></div>
      </div>
    </div>
    <div class="stat">
      <p> DEF: </p>
      <div class="bar">
        <div style="width: ${poke.stats.def}%;"></div>
      </div>
    </div>
    <div class="stat">
      <p> SPA: </p>
      <div class="bar">
        <div style="width: ${poke.stats.spa}%;"></div>
      </div>
    </div>
    <div class="stat">
      <p>SPD: </p>
      <div class="bar">
        <div style="width: ${poke.stats.spd}%;"></div>
      </div>
    </div>
    
  </div>
</article>
  `;
}

const renderPokemons = () => {
  console.log("Entre");
  const _pokeCards = pokemons.map(poke => createPokemonCard(poke));
  console.log(pokemons);
  pokeParty.innerHTML = _pokeCards.join("\n")
  changeColor();
}

const changeColor = () => {
  // Obtener todas las cartas que se encuentren en la página
  pokeCards = document.querySelectorAll("#pokemon-party-section > article.card");

  pokeCards.forEach(card => {
    let text = card.getAttribute("class");
    let type = text.substring(5); 
    color = getColorFromType(type);
    card.style.backgroundColor = color;
  });
}

const getColorFromType = (type) => {
  let _colors = {
    "normal": "#212121",
    "fighting": "#c62828",
    "flying": "#0277bd",
    "poison": "#6a1b9a",
    "ground": "#3e2723",
    "rock": "#616161",
    "bug": "#827717",
    "ghost": "#12005e",
    "steel": "#37474f",
    "fire": "#bf360c",
    "water": "#1a237e",
    "grass": "#1b5e20",
    "electric": "#fbc02d",
    "psychic": "#c2185b",
    "ice": "#4fc3f7",
    "dragon": "#0d47a1",
    "dark": "#000000",
    "fairy": "#9e00c5",
  }

  for (key in _colors){
    if (key == type){
      return _colors[key];
    }
  }
}

//Main function
const Main = () => {
  bindElements();
  setFormListener();
}

window.onload = Main;
