export interface IFormInputs {
	username?: string;
	email: string;
	password: string;
}

export interface IFormProps {
	mode: 'login' | 'register';
}
