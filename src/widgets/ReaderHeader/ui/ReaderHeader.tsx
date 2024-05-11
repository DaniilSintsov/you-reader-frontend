'use client';

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import styles from '@/src/widgets/Header/ui/Header/Header.module.css';
import BackReaderButton from '@/src/features/BackReaderButton';
import { IReaderHeaderProps } from './ReaderHeader.types';
import { FindInPage, List } from '@mui/icons-material';
import PageSwitcher from '../../PageSwitcher';

export default function ReaderHeader({
	isMobile,
	book,
	setIsTOCOpen,
	setIsThumbnailsOpen,
	currentPage,
	setCurrentPage,
}: IReaderHeaderProps) {
	return (
		<AppBar
			className={styles.header}
			position="fixed">
			<Toolbar
				sx={{
					height: '100%',
					columnGap: { xs: 1, md: 4 },
					minHeight: { xs: 'unset', md: 'unset' },
					paddingLeft: { xs: 1, sm: 3 },
					paddingRight: { xs: 1, sm: 3 },
				}}
				disableGutters>
				<BackReaderButton />
				<Box
					sx={{
						display: 'flex',
						flexGrow: 1,
						justifyContent: 'space-between',
						alignItems: 'center',
						overflow: 'hidden',
					}}>
					<Typography
						sx={{
							display: 'inline-block',
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
						}}
						variant="subtitle1"
						component={'h1'}>
						{[book.title, book.author].filter(Boolean).join(' - ')}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', gap: { xs: 1, md: 4 } }}>
					{!isMobile && (
						<PageSwitcher
							pagesCount={book.pagesCount as number}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
					)}
					<Box sx={{ display: 'flex' }}>
						<IconButton onClick={() => setIsThumbnailsOpen(true)}>
							<FindInPage sx={{ color: 'var(--black)' }} />
						</IconButton>
						<IconButton onClick={() => setIsTOCOpen(true)}>
							<List sx={{ color: 'var(--black)' }} />
						</IconButton>
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
