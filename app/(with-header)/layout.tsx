import Header from '@/src/widgets/Header';
import { PropsWithChildren } from 'react';

export default function WithHeaderLayout({ children }: PropsWithChildren) {
	return (
		<div id="app">
			<Header />
			<main>{children}</main>
		</div>
	);
}
