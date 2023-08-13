import { useContext } from 'react';
import { IThemeContextProps, ThemeContext } from 'contexts/ThemeContext';

export const useTheme = (): IThemeContextProps => {
	const themeStore = useContext(ThemeContext);

	return themeStore;
};
