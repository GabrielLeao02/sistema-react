
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './presenter/home/home';
import Register from './presenter/register/register';
import NavBar from './presenter/navBar/navBar';
import ContainerGlobal from './presenter/containerGlobal/containerGlobal';
import ContainerStyled from './presenter/containerGlobal/containerStyled';

function App() {
	return (
		<>
			<NavBar />
			<ContainerGlobal>
				
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Register />} />
							<Route path='/home' element={<ContainerStyled><Home /></ContainerStyled>} />
							<Route path='/register' element={<Register />} />
						</Routes>
					</BrowserRouter>
				
			</ContainerGlobal>
		</>
	);
}

export default App;
