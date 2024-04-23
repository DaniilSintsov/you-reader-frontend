'use client';

import { PropsWithChildren } from 'react';
import { IContainerCheckAuthProps } from './ContainerCheckAuth.types';
import { Box, Container, Typography } from '@mui/material';
import { useProfile } from '../../lib/hooks/useStoreProfile';
import Link from 'next/link';

export default function ContainerCheckAuth({
	children,
	sx,
}: PropsWithChildren<IContainerCheckAuthProps>) {
	const { isAuth } = useProfile();

	return (
		<Container
			sx={{ paddingTop: 4, paddingBottom: 4, ...sx }}
			maxWidth="lg">
			{isAuth ? (
				children
			) : (
				<>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Typography
							variant="h5"
							component="h1"
							sx={{ textAlign: 'center' }}>
							<Link href="/login?mode=login">Войдите</Link> или{' '}
							<Link href="/login?mode=register">зарегистрируйтесь</Link>, чтобы
							пользоваться приложением
						</Typography>
					</Box>
				</>
			)}
		</Container>
	);
}
