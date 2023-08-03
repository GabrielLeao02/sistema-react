import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './presenter/home/home';
import GlobalContainer from './presenter/containerGlobal/GlobalContainer';
import StyledContainerWrapper from './presenter/containerGlobal/StyledContainer';
import { createTheme, Shadows, ThemeProvider } from '@mui/material/styles';
import Register from './presenter/register/register';
import NavBar from './presenter/navBar/navBar';

function App() {
	// Definir a cor primária personalizada
	const customTheme = createTheme({
		palette: {
			primary: {
				light: '#FFF',
				main: '#fcc116', // Insira a cor primária desejada aqui
			},
			secondary: {
				main: '#333333',
			},
			background: { default: 'transparent' },
			grey: {
				500: '#272727', // Defina aqui a cor de cinza desejada para a borda
			},
			text: {
				primary: '#fff',
			},
		},
		typography: {
			button: {
				textTransform: 'none', // Impede que o texto do botão seja transformado em maiúsculas
				color: '#FFF', // Define a cor do texto dos botões
			},
		},
		shadows: [
			'none', // shadow level 0
			'0px 2px 4px rgba(0, 0, 0, 0.1)', // shadow level 1
			'0px 4px 8px rgba(0, 0, 0, 0.1)', // shadow level 2
			'0px 6px 10px rgba(0, 0, 0, 0.1)', // shadow level 3
			'0px 8px 12px rgba(0, 0, 0, 0.1)', // shadow level 4
			'0px 10px 14px rgba(0, 0, 0, 0.1)', // shadow level 5
			'0px 12px 16px rgba(0, 0, 0, 0.1)', // shadow level 6
			'0px 14px 18px rgba(0, 0, 0, 0.1)', // shadow level 7
			'0px 16px 20px rgba(0, 0, 0, 0.1)', // shadow level 8
			'0px 18px 22px rgba(0, 0, 0, 0.1)', // shadow level 9
			'0px 20px 24px rgba(0, 0, 0, 0.1)', // shadow level 10
			'0px 22px 26px rgba(0, 0, 0, 0.1)', // shadow level 11
			'0px 24px 28px rgba(0, 0, 0, 0.1)', // shadow level 12
			'0px 26px 30px rgba(0, 0, 0, 0.1)', // shadow level 13
			'0px 28px 32px rgba(0, 0, 0, 0.1)', // shadow level 14
			'0px 30px 34px rgba(0, 0, 0, 0.1)', // shadow level 15
			'0px 32px 36px rgba(0, 0, 0, 0.1)', // shadow level 16
			'0px 34px 38px rgba(0, 0, 0, 0.1)', // shadow level 17
			'0px 36px 40px rgba(0, 0, 0, 0.1)', // shadow level 18
			'0px 38px 42px rgba(0, 0, 0, 0.1)', // shadow level 19
			'0px 40px 44px rgba(0, 0, 0, 0.1)', // shadow level 20
			'0px 42px 46px rgba(0, 0, 0, 0.1)', // shadow level 21
			'0px 44px 48px rgba(0, 0, 0, 0.1)', // shadow level 22
			'0px 46px 50px rgba(0, 0, 0, 0.1)', // shadow level 23
			'0px 48px 52px rgba(0, 0, 0, 0.1)', // shadow level 24
		] as Shadows,
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
									<StyledContainerWrapper>
										<Home />
									</StyledContainerWrapper>
								</>
							}
						/>
						<Route
							path='accounts/register'
							element={<Register />}
						/>
					</Routes>
				</BrowserRouter>
			</GlobalContainer>
		</ThemeProvider>
	);
}

export default App;
