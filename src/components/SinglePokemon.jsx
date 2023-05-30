import { useContext, useEffect, useState } from 'react';
import { Context as PokemonContext } from '../context/PokemonContext';
import PokemonTypeBox from './PokemonTypeBox';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Stat from './Stat';
import { BiArrowFromRight } from 'react-icons/bi';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import capitalizeWords from '../helpers/capitalizedWords';
import AbilitySlot from './AbilitySlot';
import Loading from './Loading';

function SinglePokemon() {
	const { state, getNeighboringPokemons } = useContext(PokemonContext);

	const [weaknesses, setWeaknesses] = useState([]);

	const nav = useNavigate();

	const { pokemon, neighboringPokemons } = state;

	useEffect(() => {
		getNeighboringPokemons(Number(pokemon.id) - 1, Number(pokemon.id) + 1);
	}, [pokemon]);

	const abilities = pokemon.abilities;
	const moves = pokemon.moves;

	const navToNextPokemon = (direction) => {
		switch (direction) {
			case 'next':
				return nav(`/pokemon/${pokemon.id + 1}`);

			case 'prev':
				return nav(`/pokemon/${pokemon.id - 1}`);

			default:
				break;
		}
	};

	useEffect(() => {
		const getFirstTypeInfo = async (typesArr) => {
			let firstNames = [];
			let secondNames = [];
			const result = await axios.get(typesArr[0].type.url);
			const weakness = result.data.damage_relations.double_damage_from;
			const weaknessNames = weakness.map((type) => type.name);
			firstNames = weaknessNames;

			if (typesArr.length === 2) {
				const secondResult = await axios.get(typesArr[1].type.url);
				const secondWeakness =
					secondResult.data.damage_relations.double_damage_from;
				const secondWeaknessNames = secondWeakness.map((type) => type.name);
				secondNames = secondWeaknessNames;
			}
			const connectedNames = firstNames.concat(secondNames);
			setWeaknesses(connectedNames);
		};
		getFirstTypeInfo(pokemon.types);
	}, []);

	if (!pokemon) {
		return <Loading />;
	}
	return (
		<div className='pokemon-page-container'>
			<Link
				to={'/'}
				className='back-button'
			>
				<BiArrowFromRight className='icon' />
				Back
			</Link>
			{neighboringPokemons && (
				<div className='top-side-navigator'>
					{pokemon.id !== 1 ? (
						<div
							className='prev-button nav'
							onClick={() => navToNextPokemon('prev')}
						>
							<HiOutlineArrowSmLeft
								className='icon'
								size={28}
							/>
							<p className='id'>#{neighboringPokemons.prev.id}</p>
							<p className='name'>
								{capitalizeWords(neighboringPokemons.prev.name)}
							</p>
						</div>
					) : (
						<div
							style={{
								opacity: 0,
								width: 125,
							}}
						>
							none
						</div>
					)}

					<div className='pokemon-name'>
						<p className='name'>{pokemon.name}</p>
						<p className='pokemon-id'>#{pokemon.id}</p>
					</div>
					<div
						className='next-button nav'
						onClick={() => navToNextPokemon('next')}
					>
						<p className='name'>
							{capitalizeWords(neighboringPokemons.next.name)}
						</p>
						<p className='id'>#{neighboringPokemons.next.id}</p>
						<HiOutlineArrowSmRight
							className='icon'
							size={28}
						/>
					</div>
				</div>
			)}
			<div className='pokemon-name-tablet'>
				<p className='name'>{pokemon.name}</p>
				<p className='pokemon-id'>#{pokemon.id}</p>
			</div>
			<div className='pokemon-description-container'>
				<div className='left-side'>
					<div className='image-container'>
						<img
							src={pokemon.sprites.other.dream_world.front_default}
							alt='image'
						/>
					</div>
					<div className='stats'>
						{pokemon.stats.map((stat, i) => (
							<Stat
								key={i}
								stat={stat}
							/>
						))}
					</div>
				</div>
				<div className='right-side'>
					<div className='description'>
						<p className='weight'>
							Weight: <span>{pokemon.weight}</span>
						</p>
						<p className='height'>
							Height: <span>{pokemon.height}</span>
						</p>
						<div className='type'>
							<p className='title'>Type</p>
							<div className='type-container'>
								{pokemon.types.map((type, i) => (
									<PokemonTypeBox
										key={i}
										typeName={type.type.name}
									/>
								))}
							</div>
						</div>
						<div className='weakness'>
							<p className='title'>Weaknesses</p>
							<div className='weakness-container'>
								{weaknesses.length > 0 &&
									weaknesses.map((type, i) => (
										<PokemonTypeBox
											key={i}
											typeName={type}
										/>
									))}
							</div>
						</div>
					</div>
					<div className='abilities'>
						<p className='title'>Abilities</p>
						<div className='abilities-container'>
							<AbilitySlot
								slot={1}
								abilities={abilities}
							/>
							<AbilitySlot
								slot={2}
								abilities={abilities}
							/>
							<AbilitySlot
								slot={3}
								abilities={abilities}
							/>
							<AbilitySlot
								slot={4}
								abilities={abilities}
							/>
						</div>
					</div>
					<div className='moves'>
						<p className='title'>Available Moves</p>
						<div className='moves-container'>
							{moves.map((move, i) => (
								<p key={i}>{capitalizeWords(move.move.name)}</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SinglePokemon;
