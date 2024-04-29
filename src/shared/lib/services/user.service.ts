import { gql } from 'graphql-request';
import { authenticatedRequest } from '../../config/graphql/client';
import { IAuthResponse } from '../../models/authResponse.model';

export default class UserService {
	static async getUser() {
		return authenticatedRequest({
			query: gql`
				query {
					getUser {
						_id
						name
						email
					}
				}
			`,
		})
			.then((res: unknown) => (res as { getUser: IAuthResponse }).getUser)
			.catch(error => {
				throw error;
			});
	}
}
