import { ListItem, ListItemButton } from '@mui/material';
import styles from './MenuLink.module.css';
import Link from 'next/link';
import { IMenuLinkProps } from './MenuLink.types';

export default function MenuLink({ href, children, sx }: IMenuLinkProps) {
	return (
		<ListItem disablePadding>
			<Link
				className={styles.menuLink}
				href={href}>
				<ListItemButton
					sx={{
                        paddingLeft: { xs: 2, sm: 3 },
						paddingRight: { xs: 2, sm: 3 },
						paddingTop: 1.5,
						paddingBottom: 1.5,
						...sx,
					}}>
					{children}
				</ListItemButton>
			</Link>
		</ListItem>
	);
}
