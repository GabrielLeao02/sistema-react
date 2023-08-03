import styled from 'styled-components';

const StyledContainer = styled.div`
	box-sizing: border-box;
	display: flex;
	justify-content: start;
	flex-direction: column;
	align-items: start;
	margin-top: 80px;
	width: 80%;
	max-width: 800px;
	background: #fff;
	box-shadow: 0 8px -2px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(13.5px);
	-webkit-backdrop-filter: blur(13.5px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.18);
	padding: 20px;
	height: fit-content;
`;

export default StyledContainer;
