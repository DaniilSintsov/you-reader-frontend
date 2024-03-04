'use client';
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from './Reader.module.css';
import { PDFDocumentProxy } from 'pdfjs-dist';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function Reader() {
	const [numPages, setNumPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState<number>(1);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	function onDocumentLoadSuccess(pdf: PDFDocumentProxy): void {
		setNumPages(pdf.numPages);
	}

	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			{!!numPages && (
				<div>
					<button
						onClick={() => {
							setPageNumber(Math.max(1, pageNumber - 1));
						}}>
						prev
					</button>
					<button
						onClick={() => {
							setPageNumber(Math.min(numPages, pageNumber + 1));
						}}>
						next
					</button>
				</div>
			)}
			<Document
				className={styles.pdfDocument}
				file="postgresql.pdf"
				onLoadSuccess={onDocumentLoadSuccess}
				onItemClick={({ pageNumber }) => setPageNumber(pageNumber)}>
				<Page
					className={styles.pdfPage}
					onLoadSuccess={outline => {}}
					pageNumber={pageNumber}
				/>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description">
					<Box sx={style}>
						<div className={styles.outlineWrapper}>
							<Outline onItemClick={({ pageNumber }) => setPageNumber(pageNumber)} />
						</div>
					</Box>
				</Modal>
			</Document>
		</div>
	);
}
