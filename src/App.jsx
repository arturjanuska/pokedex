import { Provider as PokemonProvider } from './context/PokemonContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import PokemonPage from './pages/PokemonPage';

function App() {
	return (
		<PokemonProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<MainPage />}
					/>
					<Route
						path={`/pokemon/:id`}
						element={<PokemonPage />}
					/>
				</Routes>
			</BrowserRouter>
		</PokemonProvider>
	);
}

export default App;
