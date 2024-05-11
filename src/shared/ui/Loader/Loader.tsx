import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<CircularProgress
				size={80}
				sx={{ color: 'var(--brown)' }}
			/>
		</Box>
	);
}
