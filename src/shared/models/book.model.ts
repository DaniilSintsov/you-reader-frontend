export interface IBook {
	_id: string;
	title: string;
	author?: string;
	cover: string;
	file: string;
	isFavorite: boolean;
	pagesCount: number;
	currentPage: number;
}
