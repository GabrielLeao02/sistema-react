import React, { ChangeEvent, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import {
	SelectChangeEvent,
	Button,
	TextField,
	Typography,
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	useTheme,
	ThemeProvider,
} from '@mui/material';
import sha256 from 'sha256';

const FormStyled = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 8px;
`;

const DebtManagementForm = () => {
	const theme = useTheme();

	const [loading, setLoading] = useState(false);
	const [errorLogin, setErrorLogin] = useState('');
	const [formData, setFormData] = useState({
		user_email: '',
		user_password: '',
		account_product: '',
		account_product_value: '',
	});

	const [selectedCategory, setSelectedCategory] = useState<string>('');

	const handleChangeSelectCategory = (event: SelectChangeEvent<string>) => {
		setSelectedCategory(event.target.value);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};
	const handleInsertData = (event: React.FormEvent) => {
		event.preventDefault(); // Impede o comportamento padrão do formulário
		setLoading(true);

		const { user_email, user_password } = formData;
		if (user_email === '' || user_password === '') {
			setLoading(false);
			setErrorLogin('Fill in all fields to log in!');
			return;
		} else {
			setErrorLogin('');
		}

		const hashedPassword = sha256(user_password);

		const formDataWithHash = {
			user_email,
			user_password: hashedPassword,
			account_product: formData.account_product,
			account_product_value: formData.account_product_value,
		};

		fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formDataWithHash),
		})
			.then((response) => {
				if (!response.ok) {
					setLoading(false);
					setErrorLogin('The provided credentials are invalid!');
					throw new Error('Error logging in');
				} else {
					window.location.href = '/home';
				}
			})
			.catch((error) => {
				setLoading(false);
				console.error('Error:', error);
				throw new Error('Error connecting');
			});
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<FormStyled>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Typography variant='h4'>Accounts Payable</Typography>
						<AddIcon color='primary' />
					</Box>

					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'space-between'}
						gap={'4px'}
						sx={{ width: '100%' }}
					>
						<FormControl fullWidth>
							<InputLabel id='account_category-label'>
								Category
							</InputLabel>
							<Select
								labelId='account_category-label'
								id='account_category'
								value={selectedCategory}
								label='Category'
								onChange={handleChangeSelectCategory}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>

						<TextField
							id='account_product'
							name='account_product'
							label='Product'
							variant='outlined'
							value={formData.account_product}
							onChange={handleInputChange}
						/>
						<TextField
							id='account_product_value'
							name='account_product_value'
							label='Product Value'
							variant='outlined'
							value={formData.account_product_value}
							onChange={handleInputChange}
						/>
						<DeleteIcon color='error' />
					</Box>
					<Box>
						<Typography variant='caption' color='red'>
							{errorLogin}
						</Typography>
					</Box>

					<Button
						variant='contained'
						onClick={handleInsertData}
						style={{ color: theme.typography.button.color }}
					>
						{loading ? 'Loading...' : 'Insert Data'}
					</Button>
					<Button variant='outlined'>
						{loading ? 'Loading...' : 'Remove all Data'}
					</Button>
				</FormStyled>
			</ThemeProvider>
		</>
	);
};

export default DebtManagementForm;
