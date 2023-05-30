import { useContext, useEffect } from 'react';
import { Context as PokemonContext } from '../context/PokemonContext';

import PokemonCard from './PokemonCard';
import '../css/pokemonList.css';
import Loading from './Loading';

function PokemonList() {
	const { state, getPokemons, loadMore, allPokemons } =
		useContext(PokemonContext);

	const { pokemons } = state;

	useEffect(() => {
		getPokemons();
		allPokemons();
	}, []);

	return (
		<>
			{state.allPokemons.length > 0 ? (
				<div>
					<ul className='pokemon-list-container'>
						{pokemons &&
							pokemons.map((pokemon, i) => (
								<PokemonCard
									key={i}
									pokemon={pokemon}
								/>
							))}
					</ul>
					<div className='loading-section'>
						<button
							onClick={loadMore}
							className='load-button'
						>
							Load More
						</button>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
}

export default PokemonList;
