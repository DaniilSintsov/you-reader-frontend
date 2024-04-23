import { SxProps } from '@mui/material';

export interface IMenuLinkProps {
	href?: string;
	children: React.ReactNode;
	sx?: SxProps;
	onClick?: (e: React.MouseEvent) => void;
}
