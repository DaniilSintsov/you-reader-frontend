import { AxiosProgressEvent, AxiosResponse } from 'axios';
import { authenticatedRequest } from '../../config/graphql/client';
import { IBook } from '../../models/book.model';
import { gql } from 'graphql-request';
import { IWithTotalCount } from '../../types/commonTypes';

export class BookService {
	static async uploadFile(
		file: File,
		onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
	): Promise<IBook> {
		try {
			const formData = new FormData();
			formData.append(
				'operations',
				JSON.stringify({
					query: 'mutation($file: Upload!) { uploadFile(file: $file) { _id title author cover file isFavorite pagesCount currentPage currentPage } }',
					variables: { file: null },
				}),
			);
			formData.append(
				'map',
				JSON.stringify({
					'0': ['variables.file'],
				}),
			);
			formData.append('0', file);
			const res: AxiosResponse = await authenticatedRequest<AxiosResponse>({
				formData,
				onUploadProgress,
			});
			if (res.data?.errors?.length) {
				throw new Error(res.data.errors[0].message);
			}
			return res.data.data.uploadFile;
		} catch (error) {
			throw error;
		}
	}

	static async deleteFile(bookId: string): Promise<IBook> {
		return await authenticatedRequest({
			query: gql`
				mutation deleteFile($bookId: String!) {
					deleteFile(bookId: $bookId) {
						_id
					}
				}
			`,
			variables: { bookId },
		})
			.then((res: unknown) => (res as { deleteFile: IBook }).deleteFile)
			.catch(error => {
				throw error;
			});
	}

	static async getAllBooks({
		offset,
		limit,
	}: Record<string, number | undefined>): Promise<IWithTotalCount<IBook[]>> {
		return await authenticatedRequest({
			query: gql`
				query getAllBooks($offset: Int, $limit: Int) {
					getAllBooks(offset: $offset, limit: $limit) {
						totalCount
						data {
							_id
							title
							author
							cover
							isFavorite
						}
					}
				}
			`,
			variables: { offset, limit },
		})
			.then((res: unknown) => (res as { getAllBooks: IWithTotalCount<IBook[]> }).getAllBooks)
			.catch(error => {
				throw error;
			});
	}

	static async getAllFavoriteBooks({
		offset,
		limit,
	}: Record<string, number | undefined>): Promise<IWithTotalCount<IBook[]>> {
		return await authenticatedRequest({
			query: gql`
				query getAllFavoriteBooks($offset: Int, $limit: Int) {
					getAllFavoriteBooks(offset: $offset, limit: $limit) {
						totalCount
						data {
							_id
							title
							author
							cover
						}
					}
				}
			`,
			variables: { offset, limit },
		})
			.then(
				(res: unknown) =>
					(res as { getAllFavoriteBooks: IWithTotalCount<IBook[]> }).getAllFavoriteBooks,
			)
			.catch(error => {
				throw error;
			});
	}

	static async setIsFavorite(bookId: string, isFavorite: boolean): Promise<boolean> {
		return await authenticatedRequest({
			query: gql`
				mutation setIsFavorite($bookId: String!, $isFavorite: Boolean!) {
					setIsFavorite(bookId: $bookId, isFavorite: $isFavorite) {
						isFavorite
					}
				}
			`,
			variables: { bookId, isFavorite },
		})
			.then(
				(res: unknown) =>
					(res as { setIsFavorite: IBook }).setIsFavorite.isFavorite as boolean,
			)
			.catch(error => {
				throw error;
			});
	}
}
