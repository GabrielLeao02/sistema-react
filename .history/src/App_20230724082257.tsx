
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './presenter/home/home';
import Register from './presenter/register/register';
import NavBar from './presenter/navBar/navBar';

function App() {
	return (
		<>
			<NavBar />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
