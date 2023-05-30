/* eslint-disable react/prop-types */
import capitalizeWords from '../helpers/capitalizedWords';

function PokemonTypeBox({ typeName }) {
	const typeBox = (pokemonType) => {
		const boxColorsArr = [
			{
				type: 'normal',
				text: 'black',
				background: {
					full: '#a4acaf',
				},
			},
			{
				type: 'fighting',
				text: 'white',
				background: {
					full: '#d56723',
				},
			},
			{
				type: 'flying',
				text: 'black',
				background: {
					top: '#3dc7ef',
					bot: '#bdb9b8',
				},
			},
			{
				type: 'poison',
				text: 'white',
				background: {
					full: '#b97fc9',
				},
			},
			{
				type: 'ground',
				text: 'black',
				background: {
					top: '#f7de3f',
					bot: '#ab9842',
				},
			},
			{
				type: 'rock',
				text: 'white',
				background: {
					full: '#a38c21',
				},
			},
			{
				type: 'bug',
				text: 'white',
				background: {
					full: '#729f3f',
				},
			},
			{
				type: 'ghost',
				text: 'white',
				background: {
					full: '#7b62a3',
				},
			},
			{
				type: 'steel',
				text: 'black',
				background: {
					full: '#9eb7b8',
				},
			},
			{
				type: 'fire',
				text: 'white',
				background: {
					full: '#fd7d24',
				},
			},
			{
				type: 'water',
				text: 'white',
				background: {
					full: '#4592c4',
				},
			},
			{
				type: 'grass',
				text: 'black',
				background: {
					full: '#9bcc50',
				},
			},
			{
				type: 'electric',
				text: 'black',
				background: {
					full: '#eed535',
				},
			},
			{
				type: 'psychic',
				text: 'white',
				background: {
					full: '#f265b8',
				},
			},
			{
				type: 'ice',
				text: 'black',
				background: {
					full: '#51c4e7',
				},
			},
			{
				type: 'dragon',
				text: 'white',
				background: {
					top: '#53a4cf',
					bot: '#f06e56',
				},
			},
			{
				type: 'dark',
				text: 'white',
				background: {
					full: '#707070',
				},
			},
			{
				type: 'fairy',
				text: 'black',
				background: {
					full: '#fdb9e9',
				},
			},
			{
				type: 'unknown',
				text: 'white',
				background: {
					full: '#707070',
				},
			},
			{
				type: 'shadow',
				text: 'white',
				background: {
					full: '#707070',
				},
			},
		];

		const boxStyle = boxColorsArr.find((type) => type.type === pokemonType);

		if (boxStyle.background.full) {
			return {
				color: boxStyle.text,
				backgroundColor: boxStyle.background.full,
			};
		} else {
			return {
				color: boxStyle.text,
				background: `linear-gradient(0deg, ${boxStyle.background.top}, ${boxStyle.background.bot})`,
			};
		}
	};

	const boxStyle = typeBox(typeName);

	return (
		<div
			className='type-box'
			style={boxStyle}
		>
			<p>{capitalizeWords(typeName)}</p>
		</div>
	);
}

export default PokemonTypeBox;
