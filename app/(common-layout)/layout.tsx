import { MobileMenuProvider } from '@/src/shared/lib/hooks/useMobileMenu';
import Header from '@/src/widgets/Header';
import Sidebar from '@/src/widgets/Sidebar';
import { Box, Container, Grid } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function CommonLayout({ children }: PropsWithChildren) {
	return (
		<MobileMenuProvider>
			<div id="app">
				<Header />
				<main>
					<Container
						sx={{ paddingTop: 4 }}
						maxWidth="lg">
						<Box sx={{ display: { xs: 'block', md: 'none' } }}>{children}</Box>
						<Grid
							sx={{ display: { xs: 'none', md: 'flex' } }}
							container
							spacing={2}>
							<Grid
								item
								xs={4}>
								<Sidebar />
							</Grid>
							<Grid
								item
								xs={8}>
								{children}
							</Grid>
						</Grid>
					</Container>
				</main>
			</div>
		</MobileMenuProvider>
	);
}
