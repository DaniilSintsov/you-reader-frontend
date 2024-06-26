'use client';

import { useAlert } from '@/src/shared/lib/hooks/useAlert';
import Form from '@/src/widgets/Form';
import { Alert, Box, Container, Snackbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
	const params = useSearchParams();
	const modeParam = params?.get('mode');
	const { alert, clearAlert } = useAlert();

	const [mode, setMode] = useState<'login' | 'register'>(
		modeParam === 'register' ? 'register' : 'login',
	);

	useEffect(() => {
		if (modeParam) {
			setMode(modeParam === 'register' ? 'register' : 'login');
		}
	}, [modeParam]);

	return (
		<>
			<Container
				sx={{
					paddingTop: 4,
					paddingBottom: 4,
					display: 'flex',
					justifyContent: 'center',
				}}
				maxWidth="lg">
				<Box
					sx={{
						flex: '0 1 500px',
						backgroundColor: 'var(--white)',
						borderRadius: 'var(--border-radius)',
						border: '1px solid var(--border)',
						padding: 2,
					}}>
					<Typography
						sx={{
							textAlign: 'center',
							fontWeight: 500,
							mb: 2,
						}}
						variant="h5"
						component="h1">
						{mode === 'register' ? 'Регистрация' : 'Авторизация'}
					</Typography>
					<Form mode={mode} />
					<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
						{mode === 'register' ? (
							<Link href={'/login?mode=login'}>
								<Typography variant="caption">
									Уже зарегистрированы? Войти
								</Typography>
							</Link>
						) : (
							<Link href={'/login?mode=register'}>
								<Typography variant="caption">
									Нет аккаунта? Зарегистрироваться
								</Typography>
							</Link>
						)}
					</Box>
				</Box>
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
	);
}
