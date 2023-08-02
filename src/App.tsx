import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './presenter/home/home';
import GlobalContainer from './presenter/containerGlobal/GlobalContainer';
import StyledContainer from './presenter/containerGlobal/StyledContainer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavBar from './presenter/navBar/NavBar';
import Register from './presenter/register/register';

function App() {
	// Definir a cor primária personalizada
	const customTheme = createTheme({
		palette: {
			primary: {
				main: '#fcc116', // Insira a cor primária desejada aqui
			},
		},
		typography: {
			button: {
				textTransform: 'none', // Impede que o texto do botão seja transformado em maiúsculas
				color: '#FFF', // Define a cor do texto dos botões
			},
		},
	});

	return (
		<ThemeProvider theme={customTheme}>
			<GlobalContainer>
				<BrowserRouter>
					<Routes>
						<Route path='accounts/' element={<Register />} />
						<Route
							path='accounts/home'
							element={
								<>
									<NavBar />
									<StyledContainer>
										<Home />
									</StyledContainer>
								</>
							}
						/>
						<Route
							path='accounts/register'
							element={<Register />}
						/>
						<Route path='*' element={<h1>Erro rotas</h1>} />
					</Routes>
				</BrowserRouter>
			</GlobalContainer>
		</ThemeProvider>
	);
}

export default App;
