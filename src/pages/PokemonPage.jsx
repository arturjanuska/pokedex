import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { Context as PokemonContext } from '../context/PokemonContext';
import SinglePokemon from '../components/SinglePokemon';
import Loading from '../components/Loading';
import '../css/singlePokemon.css';

function PokemonPage() {
	const { state, getSinglePokemon } = useContext(PokemonContext);

	const { id } = useParams();

	const { pokemon } = state;

	useEffect(() => {
		getSinglePokemon(id);
	}, [id]);

	return (
		<div className='container'>
			<Header />
			{pokemon && Number(id) === pokemon.id ? <SinglePokemon /> : <Loading />}
		</div>
	);
}

export default PokemonPage;
