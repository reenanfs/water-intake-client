import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primary: string;
			secondary: string;
			tertiary: string;
			success: string;
			danger: string;
			warning: string;
			info: string;
			light: string;
			dark: string;
		};
		fonts: {
			primary: string;
		};
		dark: {
			isOn: boolean;
		};
	}
}

const lightTheme: DefaultTheme = {
	colors: {
		primary: '#EFE6DD',
		secondary: '#BB4430',
		tertiary: '#BB4430',
		success: '#28A745',
		danger: '#DC3545',
		warning: '#FFC107',
		info: '#17A2B8',
		light: '#EFE6DD',
		dark: '#231F20',
	},
	fonts: {
		primary: 'Arial, sans-serif',
	},
	dark: {
		isOn: false,
	},
};

const darkTheme: DefaultTheme = {
	colors: {
		primary: '#231F20',
		secondary: '#EFE6DD',
		tertiary: '#231F20',
		success: '#28A745',
		danger: '#DC3545',
		warning: '#FFC107',
		info: '#17A2B8',
		light: '#EFE6DD',
		dark: '#231F20',
	},
	fonts: {
		primary: 'Arial, sans-serif',
	},
	dark: {
		isOn: true,
	},
};

export { lightTheme, darkTheme };
