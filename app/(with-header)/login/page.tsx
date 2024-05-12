import Login from '@/src/pages/Login';
import { Suspense } from 'react';

export default function LoginPage() {
	return (
		<Suspense>
			<Login />
		</Suspense>
	);
}
