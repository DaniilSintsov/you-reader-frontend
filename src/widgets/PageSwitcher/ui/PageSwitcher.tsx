import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { IPageSwitcherProps } from './PageSwitcher.types';
import { useEffect, useRef } from 'react';

export default function PageSwitcher({
	pagesCount,
	currentPage,
	setCurrentPage,
	sx,
}: IPageSwitcherProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) inputRef.current.value = currentPage.toString();
	}, [currentPage]);

	const timeoutRef = useRef<any>(null);

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 1,
				...sx,
			}}>
			<IconButton onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
				<ArrowBackIosNew sx={{ color: 'var(--black)' }} />
			</IconButton>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<TextField
					sx={{
						width: 70,
						'& input': { p: 1, pt: 0.5, pb: 0.5 },
					}}
					defaultValue={currentPage.toString()}
					inputRef={inputRef}
					onKeyDown={e => {
						if (e.key === 'Backspace' && inputRef.current?.value?.length === 1) {
							inputRef.current.value = '';
						}
					}}
					onChange={e => {
						if (timeoutRef.current) clearTimeout(timeoutRef.current);

						const value = +e.target.value;
						timeoutRef.current = setTimeout(() => {
							if (value > 0 && value <= pagesCount) {
								setCurrentPage(value);
							}
						}, 500);
						if (inputRef.current)
							inputRef.current.value = value.toString().replace(/D/g, ''); // Remains only digits
					}}
					onBlur={() => {
						if (inputRef.current) inputRef.current.value = currentPage.toString();
					}}
					type="number"
					size="small"
				/>
				<Typography sx={{ whiteSpace: 'nowrap' }}>/ {pagesCount}</Typography>
			</Box>
			<IconButton onClick={() => setCurrentPage(Math.min(pagesCount, currentPage + 1))}>
				<ArrowForwardIos sx={{ color: 'var(--black)' }} />
			</IconButton>
		</Box>
	);
}
