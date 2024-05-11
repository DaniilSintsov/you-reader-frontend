import { IBook } from '@/src/shared/models/book.model';
import ReaderHeader from '../../ReaderHeader';
import { useEffect, useMemo, useState } from 'react';
import { Document, Outline, Page, Thumbnail } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import styles from './ReaderLayout.module.css';
import { pdfjs } from 'react-pdf';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Loader from '@/src/shared/ui/Loader/Loader';
import { useDeviceSize } from '@/src/shared/lib/hooks/useDeviceSize';
import ReaderModalLayout from '@/src/shared/ui/ReaderModalLayout/ReaderModalLayout';
import PageSwitcher from '../../PageSwitcher';
import useFetcher from '@/src/shared/lib/hooks/useFetcher';
import { BookService } from '@/src/shared/lib/services/book.service';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function ReaderLayout({ book }: { book: IBook }) {
	const [pageNumber, setPageNumber] = useState<number>(book.currentPage ?? 1);
	const [hasOutline, setHasOutline] = useState(false);

	const [isTOCOpen, setIsTOCOpen] = useState(false);
	const handleTOCClose = () => setIsTOCOpen(false);

	const [isThumbnailsOpen, setIsThumbnailsOpen] = useState(false);
	const handleThumbnailsClose = () => setIsThumbnailsOpen(false);

	const file = useMemo(() => {
		if (!!book.file) return book.file;
	}, [book.file]);

	const { isMobile, width } = useDeviceSize(700);
	const [pdf, setPdf] = useState<any>(null);

	const { execute } = useFetcher(BookService.setCurrentPage, {
		defaultData: null,
		args: [book._id, pageNumber],
	});

	useEffect(() => {
		execute([book._id, pageNumber]).catch(console.error);
	}, [pageNumber]);

	return (
		<>
			<ReaderHeader
				isMobile={isMobile}
				currentPage={pageNumber}
				setCurrentPage={setPageNumber}
				setIsTOCOpen={setIsTOCOpen}
				setIsThumbnailsOpen={setIsThumbnailsOpen}
				book={book}
			/>
			<main style={{ marginBottom: isMobile ? 'var(--bottom-panel-height)' : 0 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Document
						loading={<Loader />}
						className={styles.pdfDocument}
						file={file}
						onLoadSuccess={pdf => setPdf(pdf)}
						onItemClick={({ pageNumber }) => setPageNumber(pageNumber)}>
						<Page
							className={styles.pdfPage}
							width={isMobile ? width : 600}
							loading={
								<CircularProgress
									size={80}
									sx={{ color: 'var(--brown)' }}
								/>
							}
							pageNumber={pageNumber}
						/>
					</Document>
					{/* Table of contents */}
					<ReaderModalLayout
						open={isTOCOpen}
						onClose={handleTOCClose}
						title="Содержание">
						{!!pdf && (
							<Outline
								pdf={pdf}
								className={styles.outlineWrapper}
								onLoadSuccess={outline => setHasOutline(!!outline?.length)}
								onItemClick={({ pageNumber }) => {
									setPageNumber(pageNumber);
									setIsTOCOpen(false);
								}}
							/>
						)}
						{!Boolean(hasOutline) && (
							<Box
								sx={{
									flexGrow: 1,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<Typography
									align="center"
									fontWeight={400}
									variant="h6">
									У этого документа
									<br />
									нет содержания
								</Typography>
							</Box>
						)}
					</ReaderModalLayout>
					{/* Thumbnail */}
					<ReaderModalLayout
						open={isThumbnailsOpen}
						onClose={handleThumbnailsClose}
						title="Страницы">
						<Box
							display="grid"
							gridTemplateColumns="repeat(12, 1fr)"
							sx={{
								overflowY: 'auto',
								overflowX: 'hidden',
								width: '100%',
								rowGap: 3,
								columnGap: { xs: 'none', sm: 3 },
							}}>
							{Array.from({ length: book.pagesCount as number }, (_, i) => (
								<Box
									key={i}
									sx={{
										position: 'relative',
									}}
									gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
									<Box
										sx={{
											width: '100%',
											alignItems: 'center',
											display: 'flex',
											flexDirection: 'column',
											borderRadius: 'var(--border-radius)',
											backgroundColor: 'var(--white)',
										}}>
										<Box
											sx={{
												overflow: 'hidden',
											}}>
											<Thumbnail
												width={200}
												onItemClick={({ pageNumber }) => {
													setPageNumber(pageNumber);
													setIsThumbnailsOpen(false);
												}}
												loading={<></>}
												className={styles.thumbnail}
												pdf={pdf}
												pageNumber={i + 1}
											/>
										</Box>
										<Typography
											align="center"
											sx={{ display: 'block', height: '20px' }}
											variant="caption">
											{i + 1}
										</Typography>
									</Box>
									{/* </Grid> */}
								</Box>
							))}
						</Box>
					</ReaderModalLayout>
				</Box>
				{isMobile && (
					<Box
						sx={{
							zIndex: 10,
							borderTop: '1px solid var(--border)',
							height: 'var(--bottom-panel-height)',
							backgroundColor: 'var(--white)',
							position: 'fixed',
							bottom: 0,
							left: 0,
							right: 0,
							paddingLeft: { xs: 1, sm: 3 },
							paddingRight: { xs: 1, sm: 3 },
							display: 'flex',
							alignItems: 'center',
						}}>
						<PageSwitcher
							pagesCount={book.pagesCount as number}
							currentPage={pageNumber}
							setCurrentPage={setPageNumber}
							sx={{ justifyContent: 'space-between', flexGrow: 1 }}
						/>
					</Box>
				)}
			</main>
		</>
	);
}
