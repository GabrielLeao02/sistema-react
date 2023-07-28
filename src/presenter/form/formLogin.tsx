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
	setMostrarBotao: (value: boolean) => void;
};

function FormLogin({ setMostrarBotao }: FormLoginProps) {
	const [usuarioEmailError, setUsuarioEmailError] = useState(false);
	const [emailErrorText, setEmailErrorText] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorLogin, setErrorLogin] = useState('');
	const [formData, setFormData] = useState({
		usuario_email: '',
		usuario_senha: '',
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
		// Expressão regular para validar o email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleLogin = () => {
		// Lógica de login
		// Após o login ser realizado com sucesso, chame a função setMostrarBotao
		setMostrarBotao(true);
	};

	const handleSubmit = async (): void => {
		setLoading(true);

		const { usuario_email, usuario_senha } = formData;
		for (const fieldName in formData) {
			const fieldValue = formData[fieldName as keyof typeof formData];
			if (fieldValue === '') {
				setLoading(false);
				setErrorLogin(
					'Preencha todos os campos para realizar o login!'
				);
				return;
			} else {
				setErrorLogin('');
			}
		}

		if (!isEmailValid(usuario_email)) {
			setUsuarioEmailError(true);
			setEmailErrorText('Insira um email válido!');
			setLoading(false);
			return;
		} else {
			setUsuarioEmailError(false);
			setEmailErrorText('');
		}

		const hashedPassword = sha256(usuario_senha);

		const formDataWithHash = {
			usuario_email,
			usuario_senha: hashedPassword,
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
				setErrorLogin('As credenciais fornecidas são inválidas!');
				throw new Error('Erro ao logar');
			} else {
				window.location.href = '/home';
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<FormStyled>
				<Typography variant='h4'>Login</Typography>
				<TextField
					id='usuario_email'
					name='usuario_email'
					error={usuarioEmailError}
					label='E-mail'
					type='email'
					variant='outlined'
					value={formData.usuario_email}
					onChange={handleInputChange}
					helperText={emailErrorText}
				/>
				<TextField
					id='usuario_senha'
					name='usuario_senha'
					label='Senha'
					type='password'
					variant='outlined'
					value={formData.usuario_senha}
					onChange={handleInputChange}
				/>
				<Box>
					<Typography variant='caption' color='red'>
						{errorLogin}
					</Typography>
				</Box>

				<Button variant='contained' onClick={handleSubmit}>
					{loading ? 'Carregando...' : 'Entrar'}
				</Button>
				<Button variant='outlined' onClick={handleLogin}>
					Cadastro
				</Button>
			</FormStyled>
		</>
	);
}

export default FormLogin;
