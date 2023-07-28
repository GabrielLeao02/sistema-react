import React, { useState } from 'react';
import styled from 'styled-components';
import {
	SelectChangeEvent,
	Button,
	TextField,
	Typography,
	Box,
} from '@mui/material';
import sha256 from 'sha256';

const FormStyled = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 8px;
`;

type FormLoginProps = {
	setShowButton: (value: boolean) => void;
};

function LoginForm({ setShowButton }: FormLoginProps) {
	const [userEmailError, setUserEmailError] = useState(false);
	const [emailErrorText, setEmailErrorText] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorLogin, setErrorLogin] = useState('');
	const [formData, setFormData] = useState({
		user_email: '',
		user_password: '',
	});

	const handleInputChange = (
		e:
			| SelectChangeEvent<string[]>
			| React.ChangeEvent<{ name: string; value: unknown }>
	) => {
		const { name, value } = e.target as HTMLInputElement;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const isEmailValid = (email: string) => {
		// Regular expression to validate the email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleLogin = () => {
		// Login logic
		// After successful login, call the setShowButton function
		setShowButton(true);
	};

	const handleLoginUser = () => {
		void handleSubmit();
	};

	const handleSubmit = async () => {
		setLoading(true);

		const { user_email, user_password } = formData;
		for (const fieldName in formData) {
			const fieldValue = formData[fieldName as keyof typeof formData];
			if (fieldValue === '') {
				setLoading(false);
				setErrorLogin('Fill in all fields to log in!');
				return;
			} else {
				setErrorLogin('');
			}
		}

		if (!isEmailValid(user_email)) {
			setUserEmailError(true);
			setEmailErrorText('Enter a valid email!');
			setLoading(false);
			return;
		} else {
			setUserEmailError(false);
			setEmailErrorText('');
		}

		const hashedPassword = sha256(user_password);

		const formDataWithHash = {
			user_email,
			user_password: hashedPassword,
		};

		try {
			const response = await fetch('http://localhost:5000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formDataWithHash),
			});

			if (!response.ok) {
				setLoading(false);
				setErrorLogin('The provided credentials are invalid!');
				throw new Error('Error logging in');
			} else {
				window.location.href = '/home';
			}
		} catch (error) {
			throw new Error('Error connecting');
		}
	};

	return (
		<>
			<FormStyled>
				<Typography variant='h4'>Login</Typography>
				<TextField
					id='user_email'
					name='user_email'
					error={userEmailError}
					label='E-mail'
					type='email'
					variant='outlined'
					value={formData.user_email}
					onChange={handleInputChange}
					helperText={emailErrorText}
				/>
				<TextField
					id='user_password'
					name='user_password'
					label='Password'
					type='password'
					variant='outlined'
					value={formData.user_password}
					onChange={handleInputChange}
				/>
				<Box>
					<Typography variant='caption' color='red'>
						{errorLogin}
					</Typography>
				</Box>

				<Button variant='contained' onClick={handleLoginUser}>
					{loading ? 'Loading...' : 'Login'}
				</Button>
				<Button variant='outlined' onClick={handleLogin}>
					Register
				</Button>
			</FormStyled>
		</>
	);
}

export default LoginForm;