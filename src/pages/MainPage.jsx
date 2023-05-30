import PokemonList from '../components/PokemonList';
import '../css/mainPage.css';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function MainPage() {
	return (
		<div className='container'>
			<Header />
			<SearchBar />
			<PokemonList />
		</div>
	);
}

export default MainPage;
