'use client';

import useFetcher from '@/src/shared/lib/hooks/useFetcher';
import { BookService } from '@/src/shared/lib/services/book.service';
import { IBook } from '@/src/shared/models/book.model';
import BookCard from '@/src/widgets/BookCard';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Favorites() {
	const {
		data: books,
		isLoading,
		execute,
	} = useFetcher(BookService.getAllFavoriteBooks, { defaultData: [] });

	useEffect(() => {
		execute();
	}, []);

	return (
		<>
			{isLoading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
					<CircularProgress size={60} />
				</Box>
			) : (
				<>
					{!!books.length ? (
						<Grid
							container
							spacing={2}>
							{books.map((book: IBook) => (
								<BookCard
									executeGetBooks={execute}
									inFavorites
									book={book}
									key={book._id}
								/>
							))}
						</Grid>
					) : (
						<Typography
							component="h1"
							sx={{
								textAlign: 'center',
								fontWeight: 400,
								padding: 1,
							}}
							variant="h6">
							В избранном нет книг
						</Typography>
					)}
				</>
			)}
		</>
	);
}
