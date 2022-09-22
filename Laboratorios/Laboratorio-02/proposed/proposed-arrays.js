const pokemon = [
    {
      name: "Pikachu",
      type: "electric",
      attackPoints: 55,
      defensePoints: 40,
    },
    {
      name: "Bulbasaur",
      type: "grass",
      attackPoints: 49,
      defensePoints: 49,
    },
    {
      name: "Charmander",
      type: "fire",
      attackPoints: 52,
      defensePoints: 43,
    },
    {
      name: "Squirtle",
      type: "water",
      attackPoints: 48,
      defensePoints: 65,
    },
];


/* El entrenador desea saber si existe algún pokemon tipo fuego en su equipo. */
const getPokemon = (type) => {
    return new Promise ((resolve, reject) => {
        const thePokemon = pokemon.find((p) => p.type === type) ?.name; 
        thePokemon ? resolve(thePokemon) : reject("There's no pokemon with such type"); 
    });
};  

pokemon.type = "water";
let pokemonName; 

getPokemon(pokemon.type).then((pokemon) => {
    pokemonName = pokemon.name;
    return () => console.log(`${pokemonName} is ${pokemon.type} type`); 
}).catch((err) => console.warn(err));

/* El entrenador fue desafiado a una batalla pokemon, pero solo debe utilizar los dos primeros pokemon con los que cuenta en su equipo. Para ello debe hacer uso del método slice,y con dicho método crear un arreglo donde estén sus dos primeros pokemon. */

console.log("---------------------- Two first pokemon ----------------------");
const newTeam = [pokemon.slice(0, 2)]; 
console.log(newTeam)

    pokemon.splice(2, 0, {  
    name: "Mewtwo",
    type: "psychic",
    attackPoints: 110,
    defensePoints: 90,}); 

console.log("---------------------- New team with Mewtwo ----------------------");
console.log(pokemon);

console.log("---------------------- New team without pokemon in position 1 ----------------------");
const teamUpdated = [pokemon.slice(1)]; 
console.log(teamUpdated);


pokemon.map(function(name, type, attackPoints, defensePoints){
    console.log(` The pokemon ${name} is a ${type} with ${attackPoints} attack points and ${defensePoints} defense points`)
}); 

