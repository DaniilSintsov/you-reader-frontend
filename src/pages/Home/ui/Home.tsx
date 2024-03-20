'use client';
import MenuLink from '@/src/shared/MenuLink';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, Container, Grid, List, ListItemButton } from '@mui/material';
import { useState } from 'react';
import menuLinkStyles from '@/src/shared/MenuLink/ui/MenuLink.module.css';

export default function Home() {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

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
						<MenuLink href="/">Избранное</MenuLink>
						<ListItemButton
							className={menuLinkStyles.menuLink}
							sx={{
								paddingLeft: { xs: 2, sm: 3 },
								paddingRight: { xs: 2, sm: 3 },
								paddingTop: 1.5,
								paddingBottom: 1.5,
								justifyContent: 'space-between',
							}}
							onClick={handleClick}>
							<span>Полки</span>
							{open ? (
								<ExpandLess sx={{ width: 18, height: 18 }} />
							) : (
								<ExpandMore sx={{ width: 18, height: 18 }} />
							)}
						</ListItemButton>
						<Collapse
							in={open}
							timeout="auto"
							unmountOnExit>
							<List disablePadding>
								<MenuLink
									sx={{ paddingLeft: 6 }}
									href="/">
									Тест
								</MenuLink>
							</List>
						</Collapse>
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
