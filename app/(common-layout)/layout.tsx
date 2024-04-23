import ContainerCheckAuth from '@/src/shared/ui/ContainerCheckAuth/ContainerCheckAuth';
import Header from '@/src/widgets/Header';
import Sidebar from '@/src/widgets/Sidebar';
import { Box, Grid } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function CommonLayout({ children }: PropsWithChildren) {
	return (
		<div id="app">
			<Header />
			<main>
				<ContainerCheckAuth>
					<Box sx={{ display: { xs: 'block', md: 'none' } }}>{children}</Box>
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
				</ContainerCheckAuth>
			</main>
		</div>
	);
}
