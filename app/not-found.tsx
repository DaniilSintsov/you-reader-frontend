import NotFound from '@/src/pages/NotFound';
import { MobileMenuProvider } from '@/src/shared/lib/hooks/useMobileMenu';
import Header from '@/src/widgets/Header';

export default function NotFoundPage() {
	return (
		<MobileMenuProvider>
			<div id="app">
				<Header />
				<main>
					<NotFound />
				</main>
			</div>
		</MobileMenuProvider>
	);
}
