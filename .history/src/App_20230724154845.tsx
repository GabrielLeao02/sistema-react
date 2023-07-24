
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './presenter/home/home';
import Register from './presenter/register/register';
import NavBar from './presenter/navBar/navBar';
import ContainerGlobal from './presenter/containerGlobal/containerGlobal';
const ContainerStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  margin-top: 80px;
  width: 80%;  
  max-width: 800px;
`;
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
