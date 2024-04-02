import { Box, Button, Container } from '@mui/material';
import styles from './NotFound.module.css';
import Link from 'next/link';

export default function NotFound() {
	return (
		<Container
			sx={{ paddingTop: 4, paddingBottom: 4 }}
			maxWidth="lg">
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					gap: 2,
				}}>
				<h1 className={styles.title}>Страница не найдена</h1>
				<Link href="/">
					<Button component="div">Вернуться на главную</Button>
				</Link>
			</Box>
		</Container>
	);
}
