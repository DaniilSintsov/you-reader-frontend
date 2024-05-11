'use client';

import useFetcher from '@/src/shared/lib/hooks/useFetcher';
import { BookService } from '@/src/shared/lib/services/book.service';
import Loader from '@/src/shared/ui/Loader/Loader';
import ReaderWrapperCheckAuth from '@/src/shared/ui/ReaderWrapperCheckAuth/ReaderWrapperCheckAuth';
import ReaderLayout from '@/src/widgets/ReaderLayout';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Reader() {
	return (
		<ReaderWrapperCheckAuth>
			<ReaderPageContent />
		</ReaderWrapperCheckAuth>
	);
}

const ReaderPageContent = () => {
	const params = useParams<{ bookId: string }>();

	const { data, error, isLoading, execute } = useFetcher(BookService.getBook, {
		defaultData: null,
		args: [params?.bookId],
	});

	useEffect(() => {
		execute().catch(console.error);
	}, []);

	useEffect(() => {
		if (error) notFound();
	}, [error]);

	return <>{isLoading ? <Loader /> : <>{data && <ReaderLayout book={data} />}</>}</>;
};
