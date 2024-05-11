'use client';

import ContainerCheckAuth from '@/src/shared/ui/ContainerCheckAuth/ContainerCheckAuth';
import WithSidebarLayout from '@/src/shared/ui/WithSidebarLayout/WithSidebarLayout';
import BookList from '@/src/widgets/BookList';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
	const params = useParams<{ groupSlug: string[] }>();

	const [page, setPage] = useState<'home' | 'favorites' | null>(null);

	const pathname = params?.groupSlug?.join('/') ?? '/';

	useEffect(() => {
		if (pathname === '/') {
			setPage('home');
		} else if (pathname === 'favorites') {
			setPage('favorites');
		} else {
			notFound();
		}
	}, [pathname]);

	return (
		<ContainerCheckAuth>
			<WithSidebarLayout>
				{!!page && <BookList isFavorites={page === 'favorites'} />}
			</WithSidebarLayout>
		</ContainerCheckAuth>
	);
}
