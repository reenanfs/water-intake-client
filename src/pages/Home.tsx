import Container from 'components/containers/container/Container';
import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
	padding: 10px;
	margin: 10px 0;
	width: 200px;
	font-size: 16px;
`;

const Button = styled.button`
	padding: 10px 20px;
	margin: 10px;
	font-size: 16px;
	cursor: pointer;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;

	&:hover {
		background-color: #0056b3;
	}
`;

const TabContainer = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin-top: 20px;
`;

const Tab = styled.div<{ active: boolean }>`
	padding: 10px;
	cursor: pointer;
	border-bottom: ${props => (props.active ? '2px solid #007BFF' : 'none')};

	&:hover {
		border-bottom: 2px solid #007bff;
	}
`;

const ConsumptionList = styled.ul`
	list-style-type: none;
	padding: 0;
`;

const ConsumptionItem = styled.li`
	padding: 5px 0;
	font-size: 16px;
`;

const Home: React.FC = () => {
	const [dailyTarget, setDailyTarget] = useState<number | string>('');
	const [dailyConsumption, setDailyConsumption] = useState<number | string>('');
	const [consumptions, setConsumptions] = useState<number[]>([]);
	const [activeTab, setActiveTab] = useState<'add' | 'view'>('add');

	const handleAddConsumption = () => {
		const consumption = Number(dailyConsumption);
		if (consumption) {
			setConsumptions([...consumptions, consumption]);
			if (consumption >= Number(dailyTarget)) {
				alert('Congratulations! You have hit your daily water intake target.');
			}
			setDailyConsumption('');
		}
	};

	return (
		<Container>
			<TabContainer>
				<Tab active={activeTab === 'add'} onClick={() => setActiveTab('add')}>
					Add Consumption
				</Tab>
				<Tab active={activeTab === 'view'} onClick={() => setActiveTab('view')}>
					View Consumption
				</Tab>
			</TabContainer>

			{activeTab === 'add' ? (
				<>
					<Input
						type='number'
						placeholder='Add your daily consumption (ml)'
						value={dailyConsumption}
						onChange={e => setDailyConsumption(e.target.value)}
					/>
					<Button onClick={handleAddConsumption}>Add Consumption</Button>
				</>
			) : (
				<ConsumptionList>
					{consumptions.map((consumption, index) => (
						<ConsumptionItem key={index}>
							Day {index + 1}: {consumption} ml
						</ConsumptionItem>
					))}
				</ConsumptionList>
			)}
		</Container>
	);
};

export default Home;
