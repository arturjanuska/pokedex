import { useContext, useRef } from 'react';
import { TbPokeball } from 'react-icons/tb';
import '../css/searchBar.css';
import { Context as PokemonContext } from '../context/PokemonContext';

function SearchBar() {
	const { searchPokemon, getPokemons } = useContext(PokemonContext);

	const inputRef = useRef();

	return (
		<div className='search-tab-container'>
			<div className='search-text'>Search for a Pokemon by name</div>
			<div className='input-container'>
				<TbPokeball className='icon' />
				<input
					ref={inputRef}
					className='search-input'
					type='text'
					onChange={(e) => {
						if (e.target.value === '') {
							getPokemons();
						} else {
							searchPokemon(e.target.value);
						}
					}}
				/>
			</div>
		</div>
	);
}

export default SearchBar;
