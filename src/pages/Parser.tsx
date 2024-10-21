import { Box, Button, Card, IconButton, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import { parseResumeFromPdf } from '../lib/parse-resume-from-pdf';
import { ArrowCircleRightOutlined, Close, FileUploadRounded } from '@mui/icons-material';
import { pdfjs, Document, Page } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const defaultFileState = {
    name: '',
    size: 0,
    fileUrl: '',
};

const Parser = () => {
    const [file, setFile] = useState(defaultFileState);
    const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
    const [numPages, setNumPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const hasFile = Boolean(file.name);

    const setNewFile = (newFile: File) => {
        if (file.fileUrl) {
            URL.revokeObjectURL(file.fileUrl);
        }

        const { name, size } = newFile;
        const fileUrl = URL.createObjectURL(newFile);
        setFile({ name, size, fileUrl });
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const newFile = event.dataTransfer.files[0];
        if (newFile.name.endsWith('.pdf')) {
            setNewFile(newFile);
        }
        setIsHoveredOnDropzone(false);
    };

    const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFile = files[0];
        setNewFile(newFile);
    };

    const onRemove = () => {
        setFile(defaultFileState);
    };

    const onImportClick = async () => {
        const resume = await parseResumeFromPdf(file.fileUrl);

        console.info('Parsed data: ', resume);
    };

    const onDocumentLoadSuccess = ({ numPages: nextNumPages }: PDFDocumentProxy): void => {
        setNumPages(nextNumPages);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <Box
            sx={{
                pt: '20px',
                minHeight: '100vh',
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
            }}>
            {hasFile ? (
                <Box>
                    <Card elevation={2}>
                        <Document
                            file={file.fileUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={(error) =>
                                alert('Error while loading document! ' + error.message)
                            }
                            onSourceError={(error) =>
                                alert('Error while retrieving document source! ' + error.message)
                            }>
                            <Page key={`page_${currentPage}`} pageNumber={currentPage} />
                        </Document>
                    </Card>
                    <Box
                        sx={{
                            height: 40,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Pagination count={numPages} size="small" onChange={handlePageChange} />
                    </Box>
                </Box>
            ) : null}

            <Box
                sx={{
                    maxWidth: 700,
                    minWidth: 300,
                    width: '100%',
                    height: 200,
                    border: `3px dashed ${isHoveredOnDropzone ? '#2196f3' : '#9e9e9e'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                    setIsHoveredOnDropzone(true);
                }}
                onDragLeave={() => setIsHoveredOnDropzone(false)}
                onDrop={onDrop}>
                {!hasFile ? (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1,
                            }}>
                            <FileUploadRounded />
                            <Typography variant="h6">Browse a pdf file or drop it here</Typography>
                        </Box>
                        <Button component="label">
                            Upload File
                            <input type="file" hidden onChange={onInputChange} />
                        </Button>
                    </>
                ) : (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1,
                            }}>
                            <Typography variant="subtitle1">{file.name}</Typography>
                            <IconButton onClick={onRemove}>
                                <Close />
                            </IconButton>
                        </Box>
                        <Button
                            variant="outlined"
                            onClick={onImportClick}
                            endIcon={<ArrowCircleRightOutlined />}>
                            Import and Continue
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Parser;
