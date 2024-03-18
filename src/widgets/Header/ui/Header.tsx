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
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import Navlink from '@/src/shared/Navlink';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export default function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(prevState => !prevState);
	};

	const drawerWidth = 320;

	const Logo = () => (
		<Link
			href="/"
			className={styles.logoContainer}>
			<div className={styles.logo}>
				<Image
					src="/img/logo.svg"
					priority={true}
					width={50}
					height={50}
					alt="youreader"
				/>
			</div>
			<p className={styles.text}>YouReader</p>
		</Link>
	);

	const drawer = (
		<div>
			<div className={styles.header}>
				<Container sx={{ height: '100%' }}>
					<ToolBar
						sx={{
							height: '100%',
							minHeight: { xs: 'unset', md: 'unset' },
							justifyContent: 'space-between',
						}}
						disableGutters>
						<Logo />
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerToggle}
							sx={{ display: { xs: 'flex', md: 'none' } }}>
							<CloseIcon />
						</IconButton>
					</ToolBar>
				</Container>
			</div>
			<Box sx={{ borderBottom: '1px solid var(--border)' }}>
				<List
					sx={{
						display: 'flex',
						flexDirection: 'column',
						paddingTop: 1,
						paddingBottom: 1,
					}}>
					<ListItem disablePadding>
						<Link
							className={styles.menuLink}
							href="/">
							<ListItemButton
								sx={{
									paddingLeft: { xs: 2, sm: 3 },
									paddingRight: { xs: 2, sm: 3 },
									paddingTop: 1.5,
									paddingBottom: 1.5,
								}}>
								Мои книги
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
			</Box>
			<Box sx={{ borderBottom: '1px solid var(--border)' }}>
				<List
					sx={{
						display: 'flex',
						flexDirection: 'column',
						paddingTop: 1,
						paddingBottom: 1,
					}}>
					<ListItem disablePadding>
						<Link
							className={styles.menuLink}
							href="/">
							<ListItemButton
								sx={{
									paddingLeft: { xs: 2, sm: 3 },
									paddingRight: { xs: 2, sm: 3 },
									paddingTop: 1.5,
									paddingBottom: 1.5,
								}}>
								Войти
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
			</Box>
		</div>
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
						columnGap: { xs: 0, md: 4 },
						minHeight: { xs: 'unset', md: 'unset' },
						justifyContent: { xs: 'space-between', md: 'flex-start' },
					}}
					disableGutters>
					<Logo />
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Navlink href="/">Мои книги</Navlink>
					</Box>
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<Navlink href="/">Войти</Navlink>
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
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
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
