import { ListItem, ListItemButton } from '@mui/material';
import styles from './MenuLink.module.css';
import Link from 'next/link';
import { IMenuLinkProps } from './MenuLink.types';

export default function MenuLink({ href, children, sx, onClick }: IMenuLinkProps) {
	const LinkContent = (
		<ListItemButton
			onClick={onClick}
			sx={{
				paddingLeft: { xs: 2, sm: 3 },
				paddingRight: { xs: 2, sm: 3 },
				paddingTop: 1.5,
				paddingBottom: 1.5,
				...sx,
			}}>
			{children}
		</ListItemButton>
	);

	return (
		<ListItem disablePadding>
			{!!href ? (
				<Link
					className={styles.menuLink}
					href={href}>
					{LinkContent}
				</Link>
			) : (
				<div className={styles.menuLink}>{LinkContent}</div>
			)}
		</ListItem>
	);
}
