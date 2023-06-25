import { DefaultTheme } from 'styled-components';
import React, { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../theme/theme';

interface IThemeProviderProps {
	children: ReactNode;
}

export interface IThemeContextProps {
	theme: DefaultTheme;
	toggleTheme: () => void;
}

export const ThemeContext = React.createContext<IThemeContextProps>({
	theme: lightTheme,
	toggleTheme: () => {},
});

export const ThemeProvider = ({
	children,
}: IThemeProviderProps): JSX.Element => {
	const storedTheme = localStorage.getItem('theme');

	const [theme, setTheme] = useState<DefaultTheme>(
		storedTheme === 'light' ? lightTheme : darkTheme
	);

	useEffect(() => {
		localStorage.setItem('theme', theme === lightTheme ? 'light' : 'dark');
	}, [theme]);

	const toggleTheme = (): void => {
		setTheme(previousTheme =>
			previousTheme === lightTheme ? darkTheme : lightTheme
		);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{<StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>}
		</ThemeContext.Provider>
	);
};
