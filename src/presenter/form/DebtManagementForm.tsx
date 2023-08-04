/* eslint-disable @typescript-eslint/no-misused-promises */
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

const FormStyled = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 8px;
`;

const AddIconWrapper = styled(AddIcon)`
	cursor: pointer;

	&:hover {
		border-radius: 50%;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	}
`;

const RemoveIconWrapper = styled(DeleteIcon)`
	cursor: pointer;

	&:hover {
		border-radius: 50%;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	}
`;

type Record = {
	account_category: string;
	account_product: string;
	account_product_value: string;
};

// ... (código anterior)

// ... (código anterior)

const DebtManagementForm = () => {
	const theme = useTheme();

	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorLogin, setErrorLogin] = useState('');

	const [records, setRecords] = useState<Record[]>([
		{
			account_category: '',
			account_product: '',
			account_product_value: '',
		},
	]);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
		index: number
	) => {
		const { name, value } = e.target;

		// Atualiza os dados do registro atual no array de records
		setRecords((prevRecords) => {
			const updatedRecord = {
				...prevRecords[index],
				[name]: value,
			};
			return Object.assign([...prevRecords], { [index]: updatedRecord });
		});
	};

	const addedRegisterAccountPayable = () => {
		setRecords((prevRecords) => [
			...prevRecords,
			{
				account_category: '',
				account_product: '',
				account_product_value: '',
			},
		]);
	};

	const handleDeleteRecord = (index: number) => {
		const updatedRecords = [...records];
		updatedRecords.splice(index, 1);
		setRecords(updatedRecords);
	};

	// eslint-disable-next-line @typescript-eslint/require-await
	const handleInsertData = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		const formDataWithHash = {
			account_data: records,
		};

		fetch('https://gabrielleaotech.com/sistema/accounts/account.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(records),
		})
			.then((response) => {
				if (!response.ok) {
					setLoading(false);
					setErrorLogin(
						'Failed to insert Accounts Payable data! report all fields'
					);
					throw new Error('Error logging in');
				} else {
					setSuccess('green');
					setErrorLogin(
						'Accounts Payable data inserted successfully!'
					);
					setLoading(false);
					setTimeout(() => {
						setRecords([
							{
								account_category: '',
								account_product: '',
								account_product_value: '',
							},
						]);
						setErrorLogin('');
					}, 2000);
				}
				return response.json();
			})

			.catch((error) => {
				// Lide com quaisquer erros que ocorram na chamada fetch ou no processamento da resposta
				console.error('Erro ao fazer login:', error);
			});

		console.log(formDataWithHash);
		setErrorLogin('');
	};

	return (
		<>
			<ThemeProvider
				theme={{
					...theme,
					palette: {
						...theme.palette,
						text: {
							primary: theme.palette.primary.light,
						},
					},
				}}
			>
				<FormStyled>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Typography variant='h4' color='textPrimary'>
							Accounts Payable
						</Typography>
						<AddIconWrapper
							color='primary'
							onClick={addedRegisterAccountPayable}
							style={{ cursor: 'pointer' }}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: '4px',
							maxHeight: 'calc( 55vh - 10px )',
							overflow: 'auto',
							paddingTop: '10px',
							paddingRight: '10px',
							scrollbarWidth: 'thin', // Largura da barra de rolagem (pode ser 'auto', 'thin' ou 'none')
							scrollbarColor: 'rebeccapurple green', // Cor da barra de rolagem (somente no Firefox)
							'&::-webkit-scrollbar': {
								width: '8px', // Largura da barra de rolagem (somente no WebKit)
							},
							'&::-webkit-scrollbar-thumb': {
								background: '#676664', // Cor da barra de rolagem (somente no WebKit)
								borderRadius: '8px', // Raio da borda do polegar da barra de rolagem (somente no WebKit)
							},
							'&::-webkit-scrollbar-thumb:hover': {
								background: '#fcc116', // Cor do polegar da barra de rolagem ao passar o mouse (somente no WebKit)
							},
						}}
					>
						{records.map((record, index) => (
							<Box
								key={index}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'space-between'}
								gap={'4px'}
								sx={{
									width: '100%',
									borderBottom: {
										xs: '1px solid #fcc116',
										sm: 'none',
									},
									padding: { xs: '20px 0px', md: '0px 0px' },
								}}
								id='form-box'
							>
								<Box
									display={'flex'}
									alignItems={'center'}
									justifyContent={'space-between'}
									gap={'10px'}
									sx={{
										width: '100%',
										flexDirection: {
											xs: 'column',
											md: 'row',
										},
									}}
								>
									<FormControl
										fullWidth
										sx={{
											width: {
												xs: '100%',
												sm: '100%',
												md: '70%',
												lg: '50%',
												xl: '50%',
											},
											display: 'flex',
											flexDirection: 'column',
											margin: '4px',
										}}
									>
										<InputLabel
											id={`account_category-label-${index}`}
											style={{
												color: theme.palette.primary
													.light,
											}}
										>
											Category
										</InputLabel>
										<Select
											labelId={`account_category-label-${index}`}
											id={`account_category-${index}`}
											value={record.account_category}
											label='Category'
											onChange={(
												e: SelectChangeEvent<string>
											) => handleInputChange(e, index)}
											name='account_category'
										>
											<MenuItem
												style={{
													color: theme.palette
														.secondary.main,
												}}
												value=''
											>
												Select an option
											</MenuItem>
											<MenuItem
												style={{
													color: theme.palette
														.secondary.main,
												}}
												value='Mercado'
											>
												Mercado
											</MenuItem>
											<MenuItem
												style={{
													color: theme.palette
														.secondary.main,
												}}
												value='Casa'
											>
												Casa
											</MenuItem>
											<MenuItem
												style={{
													color: theme.palette
														.secondary.main,
												}}
												value='Pets'
											>
												Pets
											</MenuItem>
										</Select>
									</FormControl>

									<TextField
										id={`account_product-${index}`}
										name='account_product'
										label='Product'
										variant='outlined'
										value={record.account_product}
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										) => handleInputChange(e, index)}
										InputLabelProps={{
											style: {
												color: theme.palette.primary
													.light,
												borderColor:
													theme.palette.primary.light,
											},
											// Cor do texto do label
										}}
										InputProps={{
											style: {
												color: theme.palette.primary
													.light,
												borderColor:
													theme.palette.primary.light,
											}, // Cor do texto e da borda do input
										}}
										sx={{
											width: {
												xs: '100%',
												sm: '100%',
												md: '70%',
												lg: '50%',
												xl: '50%',
											},
										}}
									/>
									<TextField
										id={`account_product_value-${index}`}
										name='account_product_value'
										label='Product Value $'
										variant='outlined'
										value={record.account_product_value}
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										) => handleInputChange(e, index)}
										InputLabelProps={{
											style: {
												color: theme.palette.primary
													.light,
												borderColor:
													theme.palette.primary.light,
											},
											// Cor do texto do label
										}}
										InputProps={{
											style: {
												color: theme.palette.primary
													.light,
												borderColor:
													theme.palette.primary.light,
											}, // Cor do texto e da borda do input
										}}
										sx={{
											width: {
												xs: '100%',
												sm: '100%',
												md: '70%',
												lg: '50%',
												xl: '50%',
											},
										}}
									/>
								</Box>
								<RemoveIconWrapper
									color='error'
									onClick={() => handleDeleteRecord(index)}
									style={{ cursor: 'pointer' }}
								/>
							</Box>
						))}
					</Box>

					<Box>
						<Typography
							style={{ fontSize: '14px' }}
							variant='caption'
							color={success}
						>
							{errorLogin}
						</Typography>
					</Box>

					<Button
						variant='contained'
						onClick={handleInsertData}
						style={{
							color: theme.typography.button.color,
							cursor: 'pointer',
						}}
					>
						{loading ? 'Loading...' : 'Insert Data'}
					</Button>
					<Button variant='outlined' style={{ cursor: 'pointer' }}>
						Remove all Data
					</Button>
				</FormStyled>
			</ThemeProvider>
		</>
	);
};

export default DebtManagementForm;
