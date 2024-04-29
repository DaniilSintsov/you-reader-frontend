'use client';

import { routes } from '@/src/shared/constants/routes';
import { useAlert } from '@/src/shared/lib/hooks/useAlert';
import { BookService } from '@/src/shared/lib/services/book.service';
import MenuLink from '@/src/shared/ui/MenuLink/MenuLink';
import { Box, Button, List, styled } from '@mui/material';
import { AxiosProgressEvent } from 'axios';
import { useState } from 'react';

export default function Sidebar() {
	const VisuallyHiddenInput = styled('input')({
		clip: 'rect(0 0 0 0)',
		clipPath: 'inset(50%)',
		height: 1,
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 0,
		whiteSpace: 'nowrap',
		width: 1,
	});

	const { setAlert } = useAlert();
	const [isBtnDisabled, setIsBtnDisabled] = useState(false);
	const [downloadPercent, setDownloadPercent] = useState(0);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsBtnDisabled(true);
		setDownloadPercent(0);
		const file = e.target.files?.[0];

		try {
			if (!file) {
				setAlert({ open: true, message: 'Выберите PDF файл', severity: 'error' });
				return;
			}

			if (file.type !== 'application/pdf') {
				setAlert({ open: true, message: 'Выберите PDF файл', severity: 'error' });
				return;
			}

			await BookService.uploadFile(file, (progressEvent: AxiosProgressEvent) => {
				if (progressEvent.progress)
					setDownloadPercent(+(progressEvent.progress * 100).toFixed(0));
			});
			setAlert({
				open: true,
				message: 'Файл успешно загружен',
				severity: 'success',
			});
		} catch (error) {
			setAlert({
				open: true,
				message: 'Произошла ошибка при загрузке файла',
				severity: 'error',
			});
			console.error(error);
		} finally {
			setIsBtnDisabled(false);
			setDownloadPercent(0);
		}
	};

	return (
		<List
			sx={{
				backgroundColor: 'var(--white)',
				borderRadius: 'var(--border-radius)',
				display: 'flex',
				flexDirection: 'column',
				border: '1px solid var(--border)',
				paddingTop: 1,
				paddingBottom: 1,
			}}>
			{routes.map(route => (
				<MenuLink
					key={route.path}
					href={route.path}>
					{route.text}
				</MenuLink>
			))}
			<Box
				sx={{
					borderTop: '1px solid var(--border)',
					marginTop: 1,
					paddingTop: 1,
					paddingLeft: { xs: 2, sm: 3 },
					paddingRight: { xs: 2, sm: 3 },
				}}>
				<Button
					size="large"
					component="label"
					variant="outlined"
					disabled={isBtnDisabled}
					sx={{
						width: '100%',
					}}>
					{isBtnDisabled ? `Загружено ${downloadPercent}%` : 'Загрузить файл'}
					{!isBtnDisabled && (
						<VisuallyHiddenInput
							onChange={handleChange}
							type="file"
							accept="application/pdf"
						/>
					)}
				</Button>
			</Box>
		</List>
	);
}
