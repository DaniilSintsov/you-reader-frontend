import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.css';

export default function Logo() {
	return (
		<Link
			href="/"
			className={styles.logoContainer}>
			<div className={styles.logo}>
				<Image
					src="/img/logo.svg"
					priority={true}
					width={50}
					height={50}
					alt="youreader"
				/>
			</div>
			<p className={styles.text}>YouReader</p>
		</Link>
	);
}
