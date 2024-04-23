import { gql } from 'graphql-request';
import { IAuthResponse } from '../../models/authResponse.model';
import { authenticatedRequest, client } from '../../config/graphql/client';

export default class AuthService {
	static async login({
		email,
		password,
	}: {
		email: string;
		password: string;
	}): Promise<IAuthResponse> {
		return authenticatedRequest({
			query: gql`
				mutation login($loginData: LoginInput!) {
					login(loginData: $loginData) {
						_id
						name
						email
						refreshToken
						accessToken
					}
				}
			`,
			variables: { loginData: { email, password } },
		})
			.then((res: unknown) => (res as { login: IAuthResponse }).login)
			.catch(error => {
				throw error;
			});
	}

	static async signup({
		username,
		email,
		password,
	}: {
		username: string;
		email: string;
		password: string;
	}): Promise<IAuthResponse> {
		return authenticatedRequest({
			query: gql`
				mutation signup($signupData: SignupInput!) {
					signup(signupData: $signupData) {
						_id
						name
						email
						refreshToken
						accessToken
					}
				}
			`,
			variables: {
				signupData: {
					name: username,
					email,
					password,
				},
			},
		})
			.then((res: unknown) => (res as { signup: IAuthResponse }).signup)
			.catch(error => {
				throw error;
			});
	}

	static async logout(): Promise<void> {
		authenticatedRequest({
			query: gql`
				mutation logout {
					logout
				}
			`,
		}).catch(error => {
			throw error;
		});
	}

	static async refresh(): Promise<IAuthResponse> {
		return client
			.request(gql`
				mutation refresh {
					refresh {
						_id
						name
						email
						refreshToken
						accessToken
					}
				}
			`)
			.then((res: unknown) => (res as { refresh: IAuthResponse }).refresh)
			.catch(error => {
				throw error;
			});
	}
}
