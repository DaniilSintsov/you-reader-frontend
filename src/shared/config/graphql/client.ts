'use client';

import { ClientError, GraphQLClient, RequestDocument } from 'graphql-request';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import AuthService from '../../lib/services/auth.service';
import { LocalStorageService } from '../../lib/services/localStorage.service';
import axios, { AxiosProgressEvent } from 'axios';
import { IAuthResponse } from '../../models/authResponse.model';

export const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
	credentials: 'include',
});

class TokenHandler {
	private static async makeReq(
		requestFunc: () => Promise<any>,
	): Promise<any | ClientError | void> {
		try {
			return await requestFunc();
		} catch (error) {
			if (
				error instanceof ClientError &&
				error.response.errors?.length &&
				error.response.errors[0].extensions?.originalError?.statusCode === 401
			) {
				return error;
			}
			return;
		}
	}

	static async intercept(
		requestFunc: () => Promise<any>,
		retryCallback: (res: IAuthResponse) => Promise<any>,
	) {
		const result = await TokenHandler.makeReq(requestFunc);

		if (!result) {
			throw new Error('Unauthorized');
		}

		if (
			result instanceof ClientError ||
			(result.data.errors.length &&
				result.data.errors[0].extensions?.originalError?.statusCode === 401)
		) {
			try {
				const res = await AuthService.refresh();
				LocalStorageService.set('token', res.accessToken);
				return await retryCallback(res);
			} catch (error) {
				throw error;
			}
		}

		return result;
	}
}

interface IGraphQLRequestArgs {
	query: RequestDocument | TypedDocumentNode<unknown, any>;
	variables?: any;
}

interface IUploadFileRequestArgs {
	formData: FormData;
	onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
}

export async function authenticatedRequest<T>(args: IGraphQLRequestArgs): Promise<T>;
export async function authenticatedRequest<T>(args: IUploadFileRequestArgs): Promise<T>;
export async function authenticatedRequest<T>(args: any): Promise<T> {
	try {
		if (args.formData) {
			return await TokenHandler.intercept(
				() =>
					axios({
						method: 'post',
						url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
						data: args.formData,
						headers: {
							'Apollo-Require-Preflight': true,
						},
						onUploadProgress: args.onUploadProgress,
					}),
				res => {
					const headers = {
						'Apollo-Require-Preflight': true,
						Authorization: `Bearer ${res.accessToken}`,
					};
					return axios({
						method: 'post',
						url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
						data: args.formData,
						headers,
						onUploadProgress: args.onUploadProgress,
					});
				},
			);
		} else if (args.query) {
			return await TokenHandler.intercept(
				() =>
					client.request(args.query, args.variables, {
						Authorization: `Bearer ${LocalStorageService.get('token')}`,
					}),
				res => {
					const headers = JSON.parse(JSON.stringify(args.headers));
					headers.Authorization = `Bearer ${res.accessToken}`;
					return client.request(args.query, args.variables, headers);
				},
			);
		} else {
			throw new Error('Invalid args');
		}
	} catch (error) {
		throw error;
	}
}
