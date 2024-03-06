import Link from 'next/link';
import { INavlinkProps } from './Navlink.types';
import styles from './Navlink.module.css';

export default function Navlink({ children, href }: INavlinkProps) {
	return (
		<Link
			className={styles.navlink}
			href={href}>
			{children}
		</Link>
	);
}
