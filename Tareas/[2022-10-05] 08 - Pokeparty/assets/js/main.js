//Declaracion de variables logica
let pokemons = [];

//Declaracion de variables visuales
let pokeForm = null;
let pokeParty = null;
let pokeCard = null; 

//bind views
const bindElements = () => {
  pokeForm = document.querySelector("#pokemon-form");
  pokeParty = document.querySelector("#pokemon-party-section");
}

const setFormListener = () => {
  pokeForm.addEventListener("submit", e => {
    // Evita que ocurra el evento por defecto
    e.preventDefault();

    // Json de todos los campos de un pokemon
    const data = new FormData(pokeForm);

    /* const _pokemon = {
      index: data.get("index"),
      name: data.get("name"),
      sprite: data.get("sprite"),
      height: data.get("height"),
      weight: data.get("weight"),
      type_1: data.get("type-1"),
      type_2: data.get("type-2"),
      hp: data.get("hp"),
      atk: data.get("atk"),
      def: data.get("def"),
      spa: data.get("spa"),
      spd: data.get("spd")
    } */

    // Arreglo de pokemones
    const _pokemon = {};
    let hasErrors = false;

    // Recorrer el json de todos los datos de un pokemon
    data.forEach((value,key) => {
      if(!value) {
        hasErrors = true;
      }

      _pokemon[key] = value;
    })

    if(hasErrors) {
      alert("Se encontraron errores");
      return;
    }

    //pokemons = [...pokemons, _pokemon];
    // Agrega el nuevo pokemon a la variable lógica de pokemons
    pokemons.unshift(_pokemon);
    // Renderiza la nueva carta del pokemon en la pantalla
    renderPokemons();
    // Limpiar el formulario
    pokeForm.reset();
  });
}

const deletePokemon = (index) => {
  let _target; 

  // Recorrer el arreglo para poder encontrar el pokemon con index recibido
  for (var i = 0; i < pokemons.length; i++){ 
    if (pokemons[i].index == index) {
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
  return `
<article data-index=${poke.index}>
  <figure class="trash-icon" id="trash-${poke.index}" onclick="deletePokemon(${poke.index})">
    <span class="material-symbols-outlined">
      delete
      </span>
  </figure>
  <figure id="pokemon">
    <img src=${poke.sprite} alt="Pokemon Sprite">
  </figure>
  <div class="info">
    <h4> ${poke.name} </h4>
    <p> # ${poke.index} </p>
    <p> Altura: ${poke.height} </p>
    <p> Peso: ${poke.weight} </p>
  </div>
  
  <div class="stats">
    <div class="stat">
      <p> HP: </p>
      <div class="bar">
        <div style="width: ${(poke.hp/255)*100}%;"></div>
      </div>
    </div>
    
    <div class="stat">
      <p> ATK: </p>
      <div class="bar">
        <div style="width: ${(poke.atk/255)*100}%;"></div>
      </div>
    </div>
    <div class="stat">
      <p> DEF: </p>
      <div class="bar">
        <div style="width: ${(poke.def/255)*100}%;"></div>
      </div>
    </div>
    <div class="stat">
      <p> SPA: </p>
      <div class="bar">
        <div style="width: ${(poke.spa/255)*100}%;"></div>
      </div>
    </div>
    <div class="stat">
      <p>SPD: </p>
      <div class="bar">
        <div style="width: ${(poke.spd/255)*100}%;"></div>
      </div>
    </div>
    
  </div>
</article>
  `;
}

const renderPokemons = () => {
  const _pokeCards = pokemons.map(poke => createPokemonCard(poke));
  pokeParty.innerHTML = _pokeCards.join("\n")
}

//Main function
const Main = () => {
  bindElements();
  setFormListener();
}

window.onload = Main;