import axios from 'axios';
import pokemonApi from '../api/pokedexApi';
import createDataContext from './createDataContext';

let nextPageUrl;

const pokemonReducer = (state, action) => {
	switch (action.type) {
		case 'get_pokemons':
			return {
				...state,
				pokemons: action.payload,
			};
		case 'all_pokemons':
			return { ...state, allPokemons: action.payload };
		case 'search_pokemon': {
			const filteredPokemons = state.allPokemons.filter((pokemon) =>
				pokemon.name.includes(action.payload)
			);
			return { ...state, pokemons: filteredPokemons };
		}
		case 'add_pokemons': {
			const pokemonsCopy = state.pokemons;
			const newPokemons = action.payload;
			const connectedArrays = pokemonsCopy.concat(newPokemons);

			return { ...state, pokemons: connectedArrays };
		}
		case 'set_pokemon':
			return { ...state, pokemon: action.payload };
		case 'neighboring_pokemons':
			return {
				...state,
				neighboringPokemons: {
					prev: action.payload.prev,
					next: action.payload.next,
				},
			};
		default:
			return state;
	}
};

const getPokemons = (dispatch) => async () => {
	const result = await pokemonApi.get('/pokemon');
	const pokemons = await Promise.all(
		result.data.results.map(async (pokemon) => {
			const data = await getSinglePokemonInfo(pokemon.url);
			return data;
		})
	);
	nextPageUrl = result.data.next;
	dispatch({
		type: 'get_pokemons',
		payload: pokemons,
	});
};

const allPokemons = (dispatch) => async () => {
	const result = await pokemonApi.get('/pokemon?limit=2000&offset=0');
	const allPokemons = await Promise.all(
		result.data.results.map(async (pokemon) => {
			const data = await getSinglePokemonInfo(pokemon.url);
			return data;
		})
	);
	const convertedData = allPokemons.map((pokemon) => {
		return {
			id: pokemon.id,
			name: pokemon.name,
			sprites: pokemon.sprites,
			types: pokemon.types,
		};
	});
	dispatch({
		type: 'all_pokemons',
		payload: convertedData,
	});
};

const getSinglePokemonInfo = async (url) => {
	const pokemonDataResult = await axios.get(url);
	const pokemonData = pokemonDataResult.data;
	return pokemonData;
};

const searchPokemon = (dispatch) => (inputValue) => {
	dispatch({
		type: 'search_pokemon',
		payload: inputValue,
	});
};

const loadMore = (dispatch) => async () => {
	const result = await axios.get(nextPageUrl);
	const pokemonData = result.data.results;

	const pokemons = await Promise.all(
		pokemonData.map(async (pokemon) => {
			const data = await getSinglePokemonInfo(pokemon.url);
			return data;
		})
	);

	dispatch({
		type: 'add_pokemons',
		payload: pokemons,
	});

	nextPageUrl = result.data.next;
};

const getSinglePokemon = (dispatch) => async (id) => {
	const result = await pokemonApi.get(`/pokemon/${id}`);
	const pokemon = result.data;
	dispatch({
		type: 'set_pokemon',
		payload: pokemon,
	});
};

const getNeighboringPokemons = (dispatch) => async (prevId, nextId) => {
	if (prevId === 0) {
		const nextPokemonResults = await pokemonApi.get(`/pokemon/${nextId}`);
		const nextPokemon = nextPokemonResults.data;
		const nextPokemonConvertedData = {
			id: nextPokemon.id,
			name: nextPokemon.name,
		};
		return dispatch({
			type: 'neighboring_pokemons',
			payload: {
				prev: null,
				next: nextPokemonConvertedData,
			},
		});
	}

	const nextPokemonResults = await pokemonApi.get(`/pokemon/${nextId}`);
	const nextPokemon = nextPokemonResults.data;
	const nextPokemonConvertedData = {
		id: nextPokemon.id,
		name: nextPokemon.name,
	};

	const prevPokemonResults = await pokemonApi.get(`/pokemon/${prevId}`);
	const prevPokemon = prevPokemonResults.data;
	const prevPokemonConvertedData = {
		id: prevPokemon.id,
		name: prevPokemon.name,
	};
	dispatch({
		type: 'neighboring_pokemons',
		payload: {
			prev: prevPokemonConvertedData,
			next: nextPokemonConvertedData,
		},
	});
};

export const { Provider, Context } = createDataContext(
	// Reducer
	pokemonReducer,
	// Actions
	{
		getPokemons,
		allPokemons,
		searchPokemon,
		loadMore,
		getSinglePokemon,
		getNeighboringPokemons,
	},
	// InitialStates
	{
		pokemons: [],
		allPokemons: [],
		pokemon: null,
		neighboringPokemons: null,
	}
);
