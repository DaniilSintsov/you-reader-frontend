import Sidebar from '@/src/widgets/Sidebar';
import { Box, Grid } from '@mui/material';
import { useDeviceSize } from '../../lib/hooks/useDeviceSize';

export default function WithSidebarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isMobile } = useDeviceSize(900);

	return (
		<>
			{isMobile ? (
				<Box sx={{ display: { xs: 'block', md: 'none' } }}>{children}</Box>
			) : (
				<Grid
					sx={{ display: { xs: 'none', md: 'flex' } }}
					container
					spacing={2}>
					<Grid
						item
						xs={3}>
						<Sidebar />
					</Grid>
					<Grid
						item
						xs={9}>
						{children}
					</Grid>
				</Grid>
			)}
		</>
	);
}
