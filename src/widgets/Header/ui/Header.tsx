'use client';
import Container from '@mui/material/Container';
import styles from './Header.module.css';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import Navlink from '@/src/shared/Navlink';

export default function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(prevState => !prevState);
	};

	const drawerWidth = 240;
	const container = window !== undefined ? () => window.document.body : undefined;

	const drawer = (
		<Box
			onClick={handleDrawerToggle}
			sx={{ textAlign: 'center' }}>
			<List>
				<ListItem>
					<Navlink href="/">Мои книги</Navlink>
					<Navlink href="/">Папки</Navlink>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<AppBar
			className={styles.header}
			position="relative">
			<Container
				maxWidth="xl"
				sx={{ height: '100%' }}>
				<ToolBar
					sx={{
						height: '100%',
						columnGap: { xs: 0, md: 3 },
						minHeight: { xs: 'unset', md: 'unset' },
						justifyContent: { xs: 'space-between', md: 'flex-start' },
					}}
					disableGutters>
					<div className={styles.logoWrapper}>
						<Image
							src="/img/logo.png"
							width={50}
							height={50}
							alt="youreader"
						/>
					</div>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Navlink href="/">Мои книги</Navlink>
						<Navlink href="/">Папки</Navlink>
					</Box>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerToggle}
						sx={{ display: { xs: 'flex', md: 'none' } }}>
						<MenuIcon />
					</IconButton>
				</ToolBar>
			</Container>
			<nav>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', md: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}>
					{drawer}
				</Drawer>
			</nav>
		</AppBar>
	);
}
