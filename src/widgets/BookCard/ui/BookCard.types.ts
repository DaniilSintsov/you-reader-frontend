import { IBook } from '@/src/shared/models/book.model';
import { IWithTotalCount } from '@/src/shared/types/commonTypes';

export interface IBookCardProps {
	book: IBook;
	inFavorites?: boolean;
	executeArgs: any;
	setBooks: React.Dispatch<React.SetStateAction<IWithTotalCount<IBook[]>>>;
	executeGetBooks: (...args: any) => Promise<any>;
}
