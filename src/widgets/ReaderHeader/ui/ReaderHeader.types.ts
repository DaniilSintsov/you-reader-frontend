import { IBook } from '@/src/shared/models/book.model';

export interface IReaderHeaderProps {
	book: IBook;
	currentPage: number;
    isMobile: boolean;
	setCurrentPage: (page: number) => void;
	setIsTOCOpen: (isOpen: boolean) => void;
	setIsThumbnailsOpen: (isOpen: boolean) => void;
}
