import Home from '@/src/pages/Home';
import Header from '@/src/widgets/Header';

export default async function HomePage() {
	return (
		<div id="app">
			<Header />
			<main>
				<Home />
			</main>
		</div>
	);
}
