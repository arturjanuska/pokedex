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

	const handleScroll = () => {
		const scrollTop =
			document.documentElement.scrollTop || document.body.scrollTop;
		const scrollHeight =
			document.documentElement.scrollHeight || document.body.scrollHeight;
		const clientHeight =
			document.documentElement.clientHeight || window.innerHeight;

		if (scrollTop + clientHeight + 20 >= scrollHeight) {
			loadMore();
		} else {
			return;
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
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
						<Loading />
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
}

export default PokemonList;
