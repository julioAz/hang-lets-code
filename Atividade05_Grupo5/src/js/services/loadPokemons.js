const POKEMONS_TOKEN = "grupo5-egjkw_pokemons";
const POKEMONS_API_URL = "https://pokeapi.co/api/v2/pokemon";
const POKEMONS_MAX_NUMBER = 150;

export async function loadPokemons() {
  let pokemons = JSON.parse(localStorage.getItem(POKEMONS_TOKEN) ?? "[]");

  if (pokemons.length) {
    return pokemons;
  }

  const pokemonsJobs = [];

  for (let i = 1; i < POKEMONS_MAX_NUMBER; ++i) {
    pokemonsJobs.push(
      fetch(`${POKEMONS_API_URL}/${i}`)
        .then((response) => response.json())
        .then((pokemon) => ({
          id: i,
          name: pokemon.name,
        }))
    );
  }

  pokemons = await Promise.all(pokemonsJobs);

  localStorage.setItem(POKEMONS_TOKEN, JSON.stringify(pokemons));

  return pokemons;
}

export async function randomPokemon() {
  const pokemons = await loadPokemons();

  const randomPokemon =
    pokemons[
      Math.floor(Math.random() * (POKEMONS_MAX_NUMBER - 1))
    ].name.toUpperCase();

  return randomPokemon;
}
