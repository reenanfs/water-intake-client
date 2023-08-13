import { AuthProvider } from 'contexts/AuthContext';
import { ThemeProvider } from 'contexts/ThemeContext';
import { ReactNode } from 'react';

interface ProviderProps {
	children: ReactNode;
}

const Providers = ({ children }: ProviderProps): JSX.Element => {
	return (
		<AuthProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</AuthProvider>
	);
};

export default Providers;
