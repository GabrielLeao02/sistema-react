import { Box, ThemeProvider, Typography, useTheme } from '@mui/material';
import Chart from 'react-apexcharts';

const Statistic = () => {
	const theme = useTheme();
	const state = {
		options: {
			chart: {
				id: 'basic-bar',
				width: '100%',
			},
			xaxis: {
				categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
				labels: {
					style: {
						colors: theme.palette.primary.light, // Cor das labels do eixo x
					},
				},
			},
			yaxis: {
				labels: {
					style: {
						colors: theme.palette.primary.light, // Cor dos valores do eixo y (série de dados)
					},
				},
			},
			plotOptions: {
				bar: {
					dataLabels: {
						position: 'top',
						style: {
							colors: ['#ffffff'],
						},
					},
					backgroundColors: ['red'], // Cor de fundo das barras (vermelho)
				},
			},
		},
		series: [
			{
				name: 'series-1',
				data: [30, 40, 45, 50, 49, 60, 70, 91],
			},
		],
	};

	return (
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
			<Box width={'100%'}>
				<Typography variant='h4' color='textPrimary'>
					Accounts Payable Statistics
				</Typography>
				<Chart
					options={state.options}
					series={state.series}
					type='bar'
					width='100%'
				/>
			</Box>
		</ThemeProvider>
	);
};

export default Statistic;
