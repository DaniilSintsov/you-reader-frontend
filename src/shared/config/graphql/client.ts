'use client';

import { ClientError, GraphQLClient, RequestDocument } from 'graphql-request';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import AuthService from '../../lib/services/auth.service';
import { LocalStorageService } from '../../lib/services/localStorage.service';

export const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
	credentials: 'include',
});

interface IGraphQLCtx {
	query: RequestDocument | TypedDocumentNode<unknown, any>;
	variables?: any;
	headers?: any;
}

class TokenHandler {
	constructor(private ctx: IGraphQLCtx) {}

	private async makeReq(): Promise<any | ClientError | void> {
		try {
			return await client.request(this.ctx.query, this.ctx.variables, this.ctx.headers);
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

	async intercept() {
		const result = await this.makeReq();

		if (!result) {
			throw new Error('Unauthorized');
		}

		if (result instanceof ClientError) {
			try {
				const res = await AuthService.refresh();
				LocalStorageService.set('token', res.accessToken);
				this.ctx.headers.Authorization = `Bearer ${res.accessToken}`;
				return await client.request(this.ctx.query, this.ctx.variables, this.ctx.headers);
			} catch (error) {
				throw error;
			}
		}

		return result;
	}
}

export async function authenticatedRequest({
	query,
	variables,
}: {
	query: RequestDocument | TypedDocumentNode<unknown, any>;
	variables?: any;
}): Promise<unknown> {
	try {
		const interceptor = new TokenHandler({
			query,
			variables,
			headers: { Authorization: `Bearer ${LocalStorageService.get('token')}` },
		});
		return await interceptor.intercept();
	} catch (error: unknown) {
		throw error;
	}
}
