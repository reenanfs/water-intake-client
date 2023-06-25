import Button from 'components/buttons/Button';
import { useTheme } from 'hooks/useTheme';

const Settings = (): JSX.Element => {
	const { toggleTheme } = useTheme();
	return <Button onClick={toggleTheme}>Toggle Theme Settings</Button>;
};

export default Settings;
