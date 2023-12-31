import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled } from 'styled-components';
import { ThemeProvider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/Context';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavBarStyled = styled.div`
	box-sizing: border-box;
	position: absolute;
	top: 0;
	width: 100%;
	display: flex;
	border: non;
	justify-content: space-between;
	align-items: center;
`;

const pages = ['Home', 'Statistics'];

const NavBar = () => {
	const { setLoggedUser } = useUserContext();
	const theme = useTheme();
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = (event: string) => {
		window.location.href = '/' + event;
	};

	const handleLogout = () => {
		setLoggedUser(false);
		navigate('/');
	};

	return (
		<ThemeProvider theme={theme}>
			<NavBarStyled>
				<AppBar position='static'>
					<Container maxWidth='xl'>
						<Toolbar disableGutters>
							<Typography
								variant='h6'
								noWrap
								component={Link} // Use Link instead of 'a' tag
								to='/home' // Set the appropriate route
								sx={{
									fontFamily: 'monospace',
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: 'inherit',
									textDecoration: 'none',
								}}
							>
								LOGO
							</Typography>

							<Box
								sx={{
									flexGrow: 1,
									display: { xs: 'flex', md: 'none' },
								}}
							>
								<IconButton
									size='large'
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={handleOpenNavMenu}
									color='inherit'
								>
									<MenuIcon />
								</IconButton>
								<Menu
									id='menu-appbar'
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: 'block', md: 'none' },
									}}
								>
									{pages.map((page) => (
										<MenuItem
											key={page}
											onClick={() =>
												handleCloseNavMenu(page)
											}
										>
											<Typography textAlign='center'>
												<Button
													to={`/${page}`}
													component={Link}
												>
													{page}
												</Button>
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>

							<Box
								sx={{
									flexGrow: 1,

									display: { xs: 'none', md: 'flex' },
								}}
							>
								{pages.map((page) => (
									<Button
										key={page}
										component={Link}
										to={`/${page}`} // This will create the appropriate route
										sx={{
											my: 2,
											color: 'white',
											display: 'block',
										}}
										style={{
											borderBottom: '1px solid #FFF',
											marginRight: '10px',
											borderRadius: '0px',
											padding: '2px',
											display: 'flex',
											justifyContent: 'center',
										}}
									>
										{page}
									</Button>
								))}
							</Box>

							<Box sx={{ flexGrow: 0 }}>
								<Button
									variant='contained'
									style={{
										cursor: 'pointer',
										background:
											theme.palette.secondary.main,
										color: theme.palette.primary.main,
										width: '100%',
									}}
									onClick={handleLogout}
								>
									Logout
								</Button>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</NavBarStyled>
		</ThemeProvider>
	);
};

export default NavBar;
