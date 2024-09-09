
const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 151;

(async () => {
    const fs = require('fs');

    // Pokemons by Id
    const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
    let fileContent = pokemonsIds.map(id => `/pokemon/${id}`).join('\n');

    // Pokemons by Page
    const pokemonsPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
    fileContent += '\n' + pokemonsPages.map(page => `/page/${page}`).join('\n');

    // Create pages by pokemon Names
    const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`);
    const { results } = await pokemonList.json();

    const pokemonNames = await Promise.all(results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return `/pokemons/${data.name}`;
    }));

    fileContent += '\n' + pokemonNames.join('\n');

    await fs.promises.writeFile('routes.txt', fileContent);
})();
