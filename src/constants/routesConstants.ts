export enum clientRoutePaths {
	HOME = '/',
	SETTINGS = '/settings',
	LOGIN = '/login',
	REGISTER = '/register',
}

export enum serverRoutePaths {
	LOGIN = '/auth/login',
	REGISTER = '/auth/register',
	LOGOUT = 'auth/logout',
	REFRESH = 'auth/refresh',
	PROFILE = '/auth/profile',
	WATER_INTAKE = '/water-intakes/',
	CALCULATE_WATER_INTAKE = '/water-intakes/calculate-target',
	USER = '/users/',
}
