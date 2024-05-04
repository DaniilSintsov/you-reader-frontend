import { useEffect, useState } from 'react';
import { IBookCardProps } from './BookCard.types';
import { Bookmark, BookmarkBorder, MoreVert } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	Menu,
	Typography,
} from '@mui/material';
import MenuLink from '@/src/shared/ui/MenuLink/MenuLink';
import Link from 'next/link';
import useFetcher from '@/src/shared/lib/hooks/useFetcher';
import { BookService } from '@/src/shared/lib/services/book.service';
import { useAlert } from '@/src/shared/lib/hooks/useAlert';

export default function BookCard({ book, inFavorites = false, executeGetBooks }: IBookCardProps) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { setAlert } = useAlert();

	const {
		data: isFavorite,
		isLoading: isSetIsFavoriteLoading,
		execute: setIsFavoriteExecute,
	} = useFetcher(BookService.setIsFavorite, {
		defaultData: book.isFavorite,
		args: [book._id, book.isFavorite],
	});

	const { isLoading: isDeleteFileLoading, execute: deleteFileExecute } = useFetcher(
		BookService.deleteFile,
		{
			defaultData: book,
			args: [book._id],
		},
	);

	const favoritesButtonHandler = async () => {
		if (inFavorites) {
			await setIsFavoriteExecute([book._id, false]);
			executeGetBooks();
		} else {
			setIsFavoriteExecute([book._id, !isFavorite]);
		}
	};

	const deleteButtonHandler = async () => {
		deleteFileExecute([book._id])
			.then(() => {
				executeGetBooks();
				setAlert({ open: true, message: 'Книга успешно удалена', severity: 'success' });
			})
			.catch(() => {
				setAlert({
					open: true,
					message: 'Произошла ошибка при удалении книги',
					severity: 'error',
				});
			});
	};

	return (
		<Grid
			item
			xs={12}
			mobileMid={6}
			sm={4}
			md={4}>
			<Card sx={{ position: 'relative' }}>
				<CardMedia
					sx={{
						paddingTop: { xs: '60%', sm: '150%' },
						backgroundSize: { xs: 'contain', sm: 'cover' },
					}}
					image={book.cover}
				/>
				{/* Add in favorites */}
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						right: 0,
						backgroundColor: 'var(--white)',
						borderBottomLeftRadius: 'var(--border-radius)',
					}}>
					<IconButton
						onClick={favoritesButtonHandler}
						disabled={isSetIsFavoriteLoading}
						title={
							isFavorite || inFavorites
								? 'Удалить из избранного'
								: 'Добавить в избранное'
						}>
						{isFavorite || inFavorites ? (
							<Bookmark sx={{ color: 'var(--brown)' }} />
						) : (
							<BookmarkBorder sx={{ color: 'var(--brown)' }} />
						)}
					</IconButton>
				</Box>
				<CardContent sx={{ p: 1, pb: 0 }}>
					<Typography
						variant="subtitle1"
						sx={{
							mb: 0.2,
							fontWeight: 500,
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
						}}>
						{book.title}
					</Typography>
					<Typography
						variant="body2"
						sx={{
							mb: 0.4,
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
						}}>
						{book.author ?? 'Без автора'}
					</Typography>
				</CardContent>
				<CardActions sx={{ p: 1, pt: 0 }}>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<Link href={`/reader/${book._id}`}>
							<Button size="small">Читать</Button>
						</Link>
						<div>
							<IconButton
								aria-label="more"
								id="long-button"
								aria-controls={open ? 'long-menu' : undefined}
								aria-expanded={open ? 'true' : undefined}
								aria-haspopup="true"
								sx={{ padding: 0.2 }}
								onClick={handleClick}>
								<MoreVert />
							</IconButton>
							<Menu
								id="long-menu"
								MenuListProps={{
									'aria-labelledby': 'long-button',
								}}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}>
								<MenuLink
									disabled={isDeleteFileLoading}
									sx={{
										paddingLeft: { xs: 2, sm: 2 },
										paddingRight: { xs: 2, sm: 2 },
										paddingTop: 1,
										paddingBottom: 1,
									}}
									onClick={() => {
										deleteButtonHandler();
										handleClose();
									}}>
									Удалить
								</MenuLink>
							</Menu>
						</div>
					</Box>
				</CardActions>
			</Card>
		</Grid>
	);
}
