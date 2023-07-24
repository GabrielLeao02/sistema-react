
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './presenter/home/home';
import Register from './presenter/register/register';
import NavBar from './presenter/navBar/navBar';
import ContainerGlobal from './presenter/containerGlobal/containerGlobal';

function App() {
	return (
		<>
			<NavBar />
			<ContainerGlobal>
			<ContainerStyled>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Register />} />
						<Route path='/home' element={<Home />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</BrowserRouter>
				</ContainerStyled>
			</ContainerGlobal>
		</>
	);
}

export default App;
