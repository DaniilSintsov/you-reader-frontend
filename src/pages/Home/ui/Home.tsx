'use client';
import { Grid } from '@mui/material';

export default function Home() {
	const file = {
		name: 'PostgreSQL. Основы языка SQL',
		url: 'postgresql.pdf',
	};

	return (
		<Grid
			container
			spacing={2}>
			<Grid
				item
				xs={4}>
				<p>{file.name}</p>
			</Grid>
		</Grid>
	);
}
