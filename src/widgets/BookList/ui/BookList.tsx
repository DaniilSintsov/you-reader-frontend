import useFetcher from '@/src/shared/lib/hooks/useFetcher';
import { BookService } from '@/src/shared/lib/services/book.service';
import { IBook } from '@/src/shared/models/book.model';
import { IWithTotalCount } from '@/src/shared/types/commonTypes';
import { useEffect, useMemo, useRef, useState } from 'react';
import BookCard from '../../BookCard';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

export default function BookList({ isFavorites }: { isFavorites: boolean }) {
	const portion = 6;
	const fetcherFunc = isFavorites ? BookService.getAllFavoriteBooks : BookService.getAllBooks;

	const [books, setBooks] = useState<IWithTotalCount<IBook[]>>({ totalCount: 0, data: [] });
	const [isFetching, setIsFetching] = useState(true);

	const { isLoading, execute } = useFetcher(fetcherFunc, {
		defaultData: { totalCount: 0, data: [] },
	});

	useEffect(() => {
		if (!isFetching) return;

		execute([{ offset: books.data.length, limit: portion }])
			.then(data => {
				const newBooks = {
					totalCount: data.totalCount,
					data: books.data.concat(data.data),
				};
				setBooks(newBooks);
			})
			.catch(console.error)
			.finally(() => setIsFetching(false));
	}, [isFetching]);

	const observerLoaderRef = useRef<IntersectionObserver>();
	const observableRef = useRef<HTMLDivElement>(null);

	const actionInSight = (entries: IntersectionObserverEntry[]) => {
		if (entries[0].isIntersecting && books.data.length < books.totalCount && !isLoading) {
			setIsFetching(true);
		}
	};

	useEffect(() => {
		if (observerLoaderRef.current) {
			observerLoaderRef.current.disconnect();
		}

		observerLoaderRef.current = new IntersectionObserver(actionInSight);

		if (observableRef.current) {
			observerLoaderRef.current.observe(observableRef.current);
		}
	}, [books]);

	const listToRender = useMemo(
		() =>
			books.data.map((book: IBook) => (
				<BookCard
					setBooks={setBooks}
					executeArgs={[{ offset: 0, limit: Math.max(books.data.length - 1, 0) }]}
					executeGetBooks={execute}
					inFavorites={isFavorites}
					book={book}
					key={book._id}
				/>
			)),
		[books],
	);

	return (
		<>
			{!!books.data.length ? (
				<Grid
					container
					spacing={2}>
					{listToRender}
				</Grid>
			) : (
				<>
					{!isFetching && (
						<Typography
							component="h1"
							sx={{
								textAlign: 'center',
								fontWeight: 400,
								padding: 1,
							}}
							variant="h6">
							Книги не найдены
						</Typography>
					)}
				</>
			)}
			{isFetching && (
				<Box sx={{ display: 'flex', justifyContent: 'center', padding: 2, mt: 2 }}>
					<CircularProgress size={60} />
				</Box>
			)}
			<Box
				ref={observableRef}
				sx={{ height: '1rem', mb: '-1rem' }}
			/>
		</>
	);
}
