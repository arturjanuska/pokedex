/* eslint-disable react/prop-types */

import PokemonTypeBox from './PokemonTypeBox';
import { useNavigate } from 'react-router-dom';

function PokemonCard({ pokemon }) {
	const firstNameLetterToUpperCase = (name) => {
		return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	};

	const nav = useNavigate();

	const navigate = (id) => {
		nav(`/pokemon/${id}`);
	};

	return (
		<li
			className='pokemon-card-container'
			onClick={() => navigate(pokemon.id)}
		>
			<div>
				<img
					className='pokemon-image'
					src={
						pokemon.sprites.other.dream_world.front_default ||
						pokemon.sprites.front_default
					}
					alt=''
				/>
			</div>
			<div className='pokemon-description'>
				<p className='pokemon-id'>#{pokemon.id}</p>
				<p className='pokemon-name'>
					{firstNameLetterToUpperCase(pokemon.name)}
				</p>
				<div className='types-container'>
					{pokemon.types.map((type, i) => (
						<PokemonTypeBox
							key={i}
							typeName={type.type.name}
						/>
					))}
				</div>
			</div>
		</li>
	);
}

export default PokemonCard;
