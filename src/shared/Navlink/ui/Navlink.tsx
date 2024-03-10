import Link from 'next/link';
import { INavlinkProps } from './Navlink.types';
import styles from './Navlink.module.css';

export default function Navlink({ children, href, fullwidth = false }: INavlinkProps) {
	return (
		<Link
			style={{ width: fullwidth ? '100%' : 'auto' }}
			className={styles.navlink}
			href={href}>
			{children}
		</Link>
	);
}
