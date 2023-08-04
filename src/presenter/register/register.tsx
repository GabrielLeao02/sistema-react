import { useState } from 'react';
import UserForm from '../form/UserForm';
import LoginForm from '../form/LoginForm';
import { styled } from 'styled-components';
import StyledContainer from '../containerGlobal/StyledContainer';

const RegisterStyles = styled.div`
	background-image: url('https://gabrielleaotech.com/image/office.jpg');
	background-size: cover;
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: start;
	align-items: start;
	padding: 30px;
	box-sizing: border-box;

	@media (max-width: 600px) {
		padding: 10px;
	}
`;

function Register() {
	const [showButton, setShowButton] = useState(false);

	return (
		<>
			<RegisterStyles>
				<StyledContainer>
					{showButton ? (
						<UserForm setShowButton={setShowButton} />
					) : (
						<LoginForm setShowButton={setShowButton} />
					)}
				</StyledContainer>
			</RegisterStyles>
		</>
	);
}

export default Register;
