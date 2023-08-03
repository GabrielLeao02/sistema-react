import styled from 'styled-components';
import { useTheme, Theme } from '@mui/material';

interface ContainerProps {
	theme: Theme;
}

const StyledContainer = styled.div<ContainerProps>`
	box-sizing: border-box;
	display: flex;
	justify-content: start;
	flex-direction: column;
	align-items: start;
	margin-top: 80px;
	width: 80%;
	max-width: 800px;
	background: ${({ theme }) => theme.palette.background.default};
	box-shadow: 0 8px -2px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(13.5px);
	border-radius: 10px;
	border: 1px solid ${({ theme }) => theme.palette.grey[500]}; /* Alterando a cor da borda para cinza */
	padding: 20px;
	box-shadow: ${({ theme }) => theme.shadows[4]};
	height: fit-content;
`;

interface StyledContainerWrapperProps {
	children: React.ReactNode;
}

function StyledContainerWrapper({ children }: StyledContainerWrapperProps) {
	const theme = useTheme();

	return <StyledContainer theme={theme}>{children}</StyledContainer>;
}

export default StyledContainerWrapper;
