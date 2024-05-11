'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BackReaderButton() {
	const router = useRouter();

	return (
		<Box
			onClick={() => router.back()}
			sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					padding: '8px',
				}}>
				<ArrowBackIcon sx={{ color: 'var(--black)' }} />
			</Box>
			<Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
				<Image
					src="/img/logo.svg"
					priority={true}
					width={50}
					height={50}
					alt="youreader"
				/>
			</Box>
		</Box>
	);
}
