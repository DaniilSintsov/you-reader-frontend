import { PropsWithChildren } from 'react';
import { IReaderModalLayoutProps } from './ReaderModalLayout.types';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function ReaderModalLayout({
	children,
	open,
	onClose,
	title,
}: PropsWithChildren<IReaderModalLayoutProps>) {
	return (
		<Modal
			sx={{
				display: 'flex',
				padding: 3,
				alignItems: 'center',
				justifyContent: 'center',
			}}
			open={open}
			onClose={onClose}>
			<Box
				sx={{
					position: 'relative',
					flexBasis: 500,
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					backgroundColor: 'var(--beige)',
					boxShadow: 24,
					padding: 3,
					borderRadius: 'var(--border-radius)',
					overflow: 'hidden',
				}}>
				<Box
					sx={{
						backgroundColor: 'var(--beige)',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingBottom: 3,
					}}>
					<Typography variant="h5">{title}</Typography>
					<IconButton onClick={onClose}>
						<Close sx={{ color: 'var(--black)' }} />
					</IconButton>
				</Box>
				{children}
			</Box>
		</Modal>
	);
}
