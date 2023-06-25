import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
	font-family: ${props => props.theme.fonts.primary};
	background: ${props => props.theme.fonts.primary};
	background-color: ${props => props.theme.fonts.primary};
  }

  button {
    font-weight: bold;
  }
`;
