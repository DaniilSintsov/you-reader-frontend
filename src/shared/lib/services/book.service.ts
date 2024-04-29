import { AxiosProgressEvent, AxiosResponse } from 'axios';
import { authenticatedRequest } from '../../config/graphql/client';
import { IBook } from '../../models/book.model';

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
}
