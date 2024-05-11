import { useEffect } from 'react';
import { useProfile } from '../../lib/hooks/useStoreProfile';
import { notFound } from 'next/navigation';
import Loader from '../Loader/Loader';

export default function ReaderWrapperCheckAuth({ children }: { children: React.ReactNode }) {
	const { isAuth, isLoading } = useProfile();

	useEffect(() => {
		if (isLoading) return;

		if (!isAuth) notFound();
	}, [isLoading]);

	return <>{isLoading ? <Loader /> : children}</>;
}
