import Link from 'next/link';
import { INavlinkProps } from './Navlink.types';
import { Button } from '@mui/material';

export default function Navlink({ children, href }: INavlinkProps) {
	return (
		<Link href={href}>
			<Button component="div">{children}</Button>
		</Link>
	);
}
