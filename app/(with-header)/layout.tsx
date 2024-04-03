import { MobileMenuProvider } from '@/src/shared/lib/hooks/useMobileMenu';
import Header from '@/src/widgets/Header';
import { PropsWithChildren } from 'react';

export default function WithHeaderLayout({ children }: PropsWithChildren) {
	return (
		<MobileMenuProvider>
			<div id="app">
				<Header />
				<main>{children}</main>
			</div>
		</MobileMenuProvider>
	);
}
