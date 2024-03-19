import MenuLink from '@/src/shared/MenuLink';
import { Box, Container, Grid, List } from '@mui/material';

export default function Home() {
	return (
		<Container
			sx={{ paddingTop: 4 }}
			maxWidth="lg">
			<Box sx={{ display: { xs: 'block', md: 'none' } }}>hello</Box>
			<Grid
				sx={{ display: { xs: 'none', md: 'flex' } }}
				container
				spacing={2}>
				<Grid
					item
					xs={4}>
					<List
						sx={{
							backgroundColor: 'var(--white)',
							display: 'flex',
							flexDirection: 'column',
							border: '1px solid var(--border)',
							paddingTop: 1,
							paddingBottom: 1,
						}}>
						<MenuLink href="/">Мои книги</MenuLink>
					</List>
				</Grid>
				<Grid
					item
					xs={8}>
					home
				</Grid>
			</Grid>
		</Container>
	);
}
