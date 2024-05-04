import { Box, Button, Container, Typography } from '@mui/material';
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
				<Typography
					variant="h5"
					component="h1"
					sx={{
						textAlign: 'center',
						fontWeight: 500,
					}}>
					Страница не найдена
				</Typography>
				<Link href="/">
					<Button component="div">Вернуться к книгам</Button>
				</Link>
			</Box>
		</Container>
	);
}
