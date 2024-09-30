import { ActivityLevel } from './waterIntakeTypes';

export interface IUser {
	username: string;
	email: string;
	weight: number;
	activity_level: ActivityLevel;
	target_water_amount: string;
}
