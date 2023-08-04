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
import { width } from '@mui/system';

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

	const handleInsertData = (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);

		const formDataWithHash = {
			account_data: records,
		};
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
				<FormStyled >
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

					{records.map((record, index) => (
						<Box
							key={index}
							display={'flex'}
							alignItems={'center'}
							justifyContent={'space-between'}
							gap={'4px'}
							sx={{ width: '100%' }}
							id='form-box'
						>
							<FormControl fullWidth sx={{ width: { xs: "100%", sm: "100%", md: "70%", lg: "50%", xl: "50%" }, display: 'flex', flexDirection: 'column', }} >
								<InputLabel
									id={`account_category-label-${index}`}
									style={{
										color: theme.palette.primary.light,
									}}
								>
									Category
								</InputLabel>
								<Select
									labelId={`account_category-label-${index}`}
									id={`account_category-${index}`}
									value={record.account_category}
									label='Category'
									onChange={(e: SelectChangeEvent<string>) =>
										handleInputChange(e, index)
									}
									name='account_category'
								>
									<MenuItem
										style={{
											color: theme.palette.secondary.main,
										}}
										value=''
									>
										Select an option
									</MenuItem>
									<MenuItem
										style={{
											color: theme.palette.secondary.main,
										}}
										value='Mercado'
									>
										Mercado
									</MenuItem>
									<MenuItem
										style={{
											color: theme.palette.secondary.main,
										}}
										value='Casa'
									>
										Casa
									</MenuItem>
									<MenuItem
										style={{
											color: theme.palette.secondary.main,
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
										color: theme.palette.primary.light,
										borderColor:
											theme.palette.primary.light,
									},
									// Cor do texto do label
								}}
								InputProps={{
									style: {
										color: theme.palette.primary.light,
										borderColor:
											theme.palette.primary.light,
									}, // Cor do texto e da borda do input
								}}
							/>
							<TextField
								id={`account_product_value-${index}`}
								name='account_product_value'
								label='Product Value'
								variant='outlined'
								value={record.account_product_value}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => handleInputChange(e, index)}
								InputLabelProps={{
									style: {
										color: theme.palette.primary.light,
										borderColor:
											theme.palette.primary.light,
									},
									// Cor do texto do label
								}}
								InputProps={{
									style: {
										color: theme.palette.primary.light,
										borderColor:
											theme.palette.primary.light,
									}, // Cor do texto e da borda do input
								}}
							/>
							<RemoveIconWrapper
								color='error'
								onClick={() => handleDeleteRecord(index)}
								style={{ cursor: 'pointer' }}
							/>
						</Box>
					))}
					<Box>
						<Typography variant='caption' color='red'>
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
						{loading ? 'Loading...' : 'Remove all Data'}
					</Button>
				</FormStyled>
			</ThemeProvider >
		</>
	);
};

export default DebtManagementForm;
