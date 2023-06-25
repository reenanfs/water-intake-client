import Button from 'components/buttons/Button';
import { useTheme } from 'hooks/useTheme';

const Home = (): JSX.Element => {
	const { toggleTheme } = useTheme();

	return (
		<>
			<Button onClick={toggleTheme}>Toggle Theme</Button>
		</>
	);
};

export default Home;
