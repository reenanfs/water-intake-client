export interface IWaterIntake {
	id: number;
	amount: number;
	created_at: Date;
	user_id: string;
}

export enum ActivityLevel {
	SEDENTARY = 'Sedentary',
	LIGHTLY_ACTIVE = 'Lightly Active',
	MODERATELY_ACTIVE = 'Moderately Active',
	VERY_ACTIVE = 'Very Active',
}
