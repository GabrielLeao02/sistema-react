import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './presenter/home/home';
import Register from './presenter/register/register';
import NavBar from './presenter/navBar/navBar';
import GlobalContainer from './presenter/containerGlobal/GlobalContainer';
import StyledContainer from './presenter/containerGlobal/StyledContainer';

function App() {
	return (
		<>
			<GlobalContainer>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Register />} />
						<Route
							path='/home'
							element={
								<>
									<NavBar />
									<StyledContainer>
										<Home />
									</StyledContainer>
								</>
							}
						/>
						<Route path='/register' element={<Register />} />
					</Routes>
				</BrowserRouter>
			</GlobalContainer>
		</>
	);
}

export default App;
