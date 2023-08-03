import styled from 'styled-components';
import { Theme, useTheme } from '@mui/material';

interface ContainerProps {
	theme: Theme;
}

const GlobalContainer = styled.div<ContainerProps>`
	padding: 20px;
	box-sizing: border-box;
	width: 100%;
	display: flex;
	justify-content: center;
	height: 100vh;
	background: ${({ theme }) => theme.palette.secondary.main};
`;

interface GlobalContainerWrapperProps {
	children: React.ReactNode;
}

export default function GlobalContainerWrapper({
	children,
}: GlobalContainerWrapperProps) {
	const theme = useTheme();

	return <GlobalContainer theme={theme}>{children}</GlobalContainer>;
}
