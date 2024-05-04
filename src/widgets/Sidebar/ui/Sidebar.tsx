'use client';

import { routes } from '@/src/shared/constants/routes';
import MenuLink from '@/src/shared/ui/MenuLink/MenuLink';
import { List, ListItem } from '@mui/material';

export default function Sidebar() {
	return (
		<List
			sx={{
				backgroundColor: 'var(--white)',
				borderRadius: 'var(--border-radius)',
				display: 'flex',
				flexDirection: 'column',
				border: '1px solid var(--border)',
				paddingTop: 1,
				paddingBottom: 1,
			}}>
			{routes.map(route => (
				<MenuLink
					key={route.path}
					href={route.path}>
					{route.text}
				</MenuLink>
			))}
			<ListItem
				disableGutters
				disablePadding
				sx={{
					borderTop: '1px solid var(--border)',
					marginTop: 1,
					marginBottom: 1,
				}}
			/>
			<MenuLink href="/upload-file">Загрузить книгу</MenuLink>
		</List>
	);
}
