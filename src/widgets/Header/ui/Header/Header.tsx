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
import { useProfile } from '@/src/shared/lib/hooks/useStoreProfile';
import { AccountCircle } from '@mui/icons-material';
import { Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import AuthService from '@/src/shared/lib/services/auth.service';
import { LocalStorageService } from '@/src/shared/lib/services/localStorage.service';
import { IAuthResponse } from '@/src/shared/models/authResponse.model';
import UserService from '@/src/shared/lib/services/user.service';

export default function Header() {
	const { openMenu, setOpenMenu } = useMobileMenu();

	const handleDrawerToggle = () => {
		setOpenMenu(prevState => !prevState);
	};

	const drawerWidth = 320;

	const { isAuth, setIsAuth, profile, setProfile } = useProfile();

	const drawer = (
		<div
			onClick={(e: React.MouseEvent<HTMLDivElement>) => {
				const elem = e.target as HTMLElement;
				if (elem.tagName === 'A' || elem.role === 'button') {
					setOpenMenu(false);
					return;
				}
				let parent = elem.parentElement;
				const verifiedParentsCount = 3; // quantity of verified parents to avoid infinite loop
				for (let i = 0; i < verifiedParentsCount; i++) {
					if (parent?.tagName === 'A' || parent?.tagName === 'BUTTON') {
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
					{isAuth ? (
						<>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 1,
									paddingBottom: 1,
									paddingLeft: { xs: 2, sm: 3 },
									paddingRight: { xs: 2, sm: 3 },
								}}>
								<AccountCircle />
								<Typography
									sx={{
										fontWeight: 500,
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										whiteSpace: 'nowrap',
									}}
									variant="subtitle1">
									{profile.name}
								</Typography>
							</Box>
							<MenuLink
								onClick={() => {
									onLogout();
								}}>
								Выйти
							</MenuLink>
						</>
					) : (
						<MenuLink href="/login?mode=login">Войти</MenuLink>
					)}
				</List>
			</Box>
		</div>
	);

	const [popupMenuEl, setPopupMenuEl] = useState<null | HTMLElement>(null);

	const handlePopupMenu = (event: React.MouseEvent<HTMLElement>) => {
		setPopupMenuEl(event.currentTarget);
	};

	const onLogout = async () => {
		try {
			await AuthService.logout();
			LocalStorageService.remove('token');
			setIsAuth(false);
			setProfile({} as IAuthResponse);
		} catch (error) {
			console.error(error);
		}
	};

	const onClosePopupMenu = () => {
		setPopupMenuEl(null);
	};

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
						{isAuth ? (
							<div>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handlePopupMenu}
									color="inherit">
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={popupMenuEl}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={!!popupMenuEl}
									onClose={onClosePopupMenu}>
									<Typography
										sx={{
											fontWeight: 500,
											width: '200px',
											textOverflow: 'ellipsis',
											overflow: 'hidden',
											whiteSpace: 'nowrap',
											padding: 2,
											paddingTop: 0,
											paddingBottom: 1,
											borderBottom: '1px solid var(--border)',
										}}
										variant="subtitle1">
										{profile.name}
									</Typography>
									<MenuLink
										sx={{
											paddingLeft: { xs: 2, sm: 2 },
											paddingRight: { xs: 2, sm: 2 },
											paddingTop: 1,
											paddingBottom: 1,
										}}
										onClick={() => {
											onLogout();
											onClosePopupMenu();
										}}>
										Выйти
									</MenuLink>
								</Menu>
							</div>
						) : (
							<Navlink href="/login?mode=login">Войти</Navlink>
						)}
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
