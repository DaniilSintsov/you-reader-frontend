'use client';

import UploadFileButton from '@/src/features/UploadFileButton';
import ContainerCheckAuth from '@/src/shared/ui/ContainerCheckAuth/ContainerCheckAuth';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function UploadFile() {
	return (
		<ContainerCheckAuth>
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
					Загружайте PDF файлы и читайте в YouReader
				</Typography>
				<Box sx={{ mt: 1 }}>
					<UploadFileButton />
				</Box>
				<Link href="/">
					<Button component="div">Читать книги</Button>
				</Link>
			</Box>
		</ContainerCheckAuth>
	);
}
