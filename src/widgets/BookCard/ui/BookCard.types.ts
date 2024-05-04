import { IBook } from '@/src/shared/models/book.model';

export interface IBookCardProps {
	book: IBook;
	inFavorites?: boolean;
	executeGetBooks: () => void;
}
