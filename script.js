const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
};

const pokedexBox = document.querySelector('.pokedex');

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const image = document.getElementById('pokemon-image');
const nameEl = document.getElementById('pokemon-name');
const numberEl = document.getElementById('pokemon-number');
const typeEl = document.getElementById('pokemon-type');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentPokemonId = 1; // Começa com o Bulbasaur

async function buscarPokemon(searchTerm) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    if (!response.ok) throw new Error('Pokémon não encontrado');

    const data = await response.json();

    image.src = data.sprites.front_default;
    nameEl.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    numberEl.textContent = `#${data.id.toString().padStart(3, '0')}`;
    
    const tipoPrincipal = data.types[0].type.name;
    typeEl.textContent = `Tipo: ${data.types.map(t => t.type.name).join(', ')}`;

    const corDeFundo = typeColors[tipoPrincipal] || '#eeeeee';
    pokedexBox.style.backgroundColor = corDeFundo;

    currentPokemonId = data.id;
  } catch (error) {
    image.src = '';
    nameEl.textContent = 'Não encontrado';
    numberEl.textContent = '';
    typeEl.textContent = '';
    pokedexBox.style.backgroundColor = '#eeeeee';
    alert('Pokémon não encontrado!');
  }

  input.value = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = input.value.trim().toLowerCase();
  if (searchTerm) {
    buscarPokemon(searchTerm);
  }
});


prevBtn.addEventListener('click', () => {
  if (currentPokemonId > 1) {
    buscarPokemon(currentPokemonId - 1);
  }
});


nextBtn.addEventListener('click', () => {
  buscarPokemon(currentPokemonId + 1);
});

buscarPokemon(currentPokemonId);