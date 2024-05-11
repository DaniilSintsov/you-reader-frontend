import { SxProps } from '@mui/material';

export interface IPageSwitcherProps {
	pagesCount: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	sx?: SxProps;
}
