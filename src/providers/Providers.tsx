import { ThemeProvider } from 'contexts/themeContext';
import { ReactNode } from 'react';

interface ProviderProps {
	children: ReactNode;
}

const Providers = ({ children }: ProviderProps): JSX.Element => {
	return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
