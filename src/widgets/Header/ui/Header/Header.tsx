'use client';
import Container from '@mui/material/Container';
import styles from './Header.module.css';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import Navlink from '@/src/shared/ui/Navlink/Navlink';
import List from '@mui/material/List';
import MenuLink from '@/src/shared/ui/MenuLink/MenuLink';
import Logo from '../Logo/Logo';
import { routes } from '@/src/shared/constants/routes';
import { useMobileMenu } from '@/src/shared/lib/hooks/useMobileMenu';

export default function Header() {
	const { openMenu, setOpenMenu } = useMobileMenu();

	const handleDrawerToggle = () => {
		setOpenMenu(prevState => !prevState);
	};

	const drawerWidth = 320;

	const drawer = (
		<div
			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				const elem = e.target as HTMLElement;
				if (elem.tagName === 'A') {
					setOpenMenu(false);
					return;
				}
				let parent = elem.parentElement;
				const verifiedParentsCount = 3; // quantity of verified parents to avoid infinite loop
				for (let i = 0; i < verifiedParentsCount; i++) {
					if (parent?.tagName === 'A') {
						setOpenMenu(false);
						break;
					}
					if (!parent?.parentElement) {
						break;
					}
					parent = parent?.parentElement;
				}
			}}>
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
					{routes.map(route => (
						<MenuLink
							key={route.path}
							href={route.path}>
							{route.text}
						</MenuLink>
					))}
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
					<MenuLink href="/">Войти</MenuLink>
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
						justifyContent: 'space-between',
					}}
					disableGutters>
					<Logo />
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
					open={openMenu}
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
