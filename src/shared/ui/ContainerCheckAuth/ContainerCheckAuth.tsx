'use client';

import { PropsWithChildren } from 'react';
import { IContainerCheckAuthProps } from './ContainerCheckAuth.types';
import { Alert, Box, Container, Snackbar, Typography } from '@mui/material';
import { useProfile } from '../../lib/hooks/useStoreProfile';
import Link from 'next/link';
import { useAlert } from '../../lib/hooks/useAlert';
import Loader from '../Loader/Loader';

export default function ContainerCheckAuth({
	children,
	sx,
}: PropsWithChildren<IContainerCheckAuthProps>) {
	const { isAuth, isLoading } = useProfile();
	const { alert, clearAlert } = useAlert();

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Container
						sx={{ paddingTop: 4, paddingBottom: 4, ...sx }}
						maxWidth="lg">
						{isAuth ? children : <NonAuthContent />}
					</Container>
					<Snackbar
						open={alert.open}
						autoHideDuration={1000}
						onClose={clearAlert}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
						<Alert
							variant="filled"
							onClose={clearAlert}
							severity={alert.severity}>
							{alert.message}
						</Alert>
					</Snackbar>
				</>
			)}
		</>
	);
}

const NonAuthContent = () => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Typography
				variant="h5"
				component="h1"
				sx={{ textAlign: 'center' }}>
				<Link href="/login?mode=login">Войдите</Link> или{' '}
				<Link href="/login?mode=register">зарегистрируйтесь</Link>, чтобы пользоваться
				приложением
			</Typography>
		</Box>
	);
};
