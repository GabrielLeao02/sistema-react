import React, { useState, KeyboardEvent } from 'react';
import {
	Box,
	Typography,
	SelectChangeEvent,
	TextField,
	Button,
} from '@mui/material';
import styled from 'styled-components';
import { isCPF, formatToCPF } from 'brazilian-values';
import sha256 from 'sha256';
import { useNavigate } from 'react-router-dom';

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

function UserForm({ setShowButton }: FormLoginProps) {
	const navigate = useNavigate();
	const [emailError, setEmailError] = useState(false);
	const [emailErrorText, setEmailErrorText] = useState('');
	const [cpfErrorText, setCpfErrorText] = useState('');
	const [registrationError, setRegistrationError] = useState('');
	const [isCpf, setIsCpf] = useState(false);
	const [formData, setFormData] = useState({
		user_name: '',
		user_cpf: '',
		user_email: '',
		user_password: '',
	});

	const register = () => {
		// Registration logic

		// After successful registration, call the setShowButton function
		setShowButton(false);
	};

	const handleChange = (
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

	const handleRegistration = () => {
		void handleSubmit();
	};

	const formatCPf = (e: KeyboardEvent<HTMLInputElement>) => {
		const inputElement = e.target as HTMLInputElement;

		const cpf = inputElement.value;
		if (!isCPF(cpf)) {
			setIsCpf(true);
			setCpfErrorText('Invalid CPF!');
			return;
		} else {
			setIsCpf(false);
			setCpfErrorText('');
		}
		const cpfFormatado = formatToCPF(cpf);

		setFormData((prevData) => ({ ...prevData, user_cpf: cpfFormatado }));
	};

	const handleSubmit = () => {
		for (const fieldName in formData) {
			const fieldValue = formData[fieldName as keyof typeof formData];
			if (fieldValue === '') {
				return setRegistrationError('Fill in all fields to register!');
			} else {
				setRegistrationError('');
			}
		}
		try {
			formData.user_cpf = formData.user_cpf.replace(/\D/g, '');

			const { user_email, user_password } = formData;

			if (!isEmailValid(user_email)) {
				setEmailError(true);
				setEmailErrorText('Enter a valid email!');
				return;
			} else {
				setEmailError(false);
				setEmailErrorText('');
			}

			const hashedPassword = sha256(user_password);
			formData.user_password = hashedPassword;
			fetch('https://gabrielleaotech.com/sistema/user/register.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
				.then(() => {
					setFormData({
						user_name: '',
						user_cpf: '',
						user_email: '',
						user_password: '',
					});
					navigate('/home');
				})
				.catch(() => {
					return setRegistrationError('Error saving form data');
				});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<FormStyled>
				<h1>User Registration</h1>
				<TextField
					id='user_name'
					name='user_name'
					label='Name'
					variant='outlined'
					value={formData.user_name}
					onChange={handleChange}
				/>
				<TextField
					id='user_cpf'
					name='user_cpf'
					label='CPF'
					error={isCpf}
					variant='outlined'
					value={formData.user_cpf}
					onChange={handleChange}
					onKeyUp={formatCPf}
					helperText={cpfErrorText}
				/>
				<TextField
					id='user_email'
					name='user_email'
					error={emailError}
					label='E-mail'
					type='email'
					variant='outlined'
					value={formData.user_email}
					onChange={handleChange}
					helperText={emailErrorText}
				/>
				<TextField
					id='user_password'
					name='user_password'
					error={emailError}
					label='Password'
					type='password'
					variant='outlined'
					value={formData.user_password}
					onChange={handleChange}
					helperText={emailErrorText}
				/>
				<Box>
					<Typography variant='caption' color={'red'}>
						{registrationError}
					</Typography>
				</Box>

				<Button variant='contained' onClick={handleRegistration}>
					Register
				</Button>

				<Button variant='outlined' onClick={register}>
					Login
				</Button>
			</FormStyled>
		</>
	);
}

export default UserForm;
