import { useEffect, useMemo, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import ExampleTemplate from '../templates/example/ExampleTemplate';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { Box, Button, Pagination } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Spinner } from '../Spinner';
import { ResumeType } from '../../types/Resume.types';
import debounce from 'lodash.debounce';
import { useResumeStore } from '../../store/ResumeStore';
import PDFPreviewMenu from './PDFPreviewMenu';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

function getWindowSize() {
    const { innerWidth, innerHeight } = window;

    //Standard A4 ratio calculated by height
    let documentWidth = (innerHeight - 60 - 80) * (210 / 297);
    let documentHeight = innerHeight - 60 - 80;

    // If smaller device
    if (innerWidth < documentWidth) {
        //A4 ratio calculated by width
        documentWidth = innerWidth - 60;
        documentHeight = documentWidth * (297 / 210);
    }

    return {
        innerWidth,
        innerHeight,
        documentWidth,
        documentHeight,
    };
}

const PDFPreview = () => {
    const resumeData = useResumeStore((state) => state);
    const [numPages, setNumPages] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [documentTemplate, setDocumentTemplate] = useState(
        <ExampleTemplate resumeData={resumeData} />,
    );

    const onDocumentLoadSuccess = ({ numPages: nextNumPages }: PDFDocumentProxy): void => {
        setNumPages(nextNumPages);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const debouncedDocumentGenerate = useMemo(
        () =>
            debounce(
                (resumeData: ResumeType) =>
                    setDocumentTemplate(<ExampleTemplate resumeData={resumeData} />),
                500,
            ),
        [],
    );

    useEffect(() => {
        debouncedDocumentGenerate(resumeData);
    }, [debouncedDocumentGenerate, resumeData]);

    return (
        <Box
            sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                background: blueGrey[50],
                minHeight: '100vh',
                maxHeight: '100vh',
                margin: '0 auto',
            }}
            top={{ xs: 'auto', lg: 0 }}
            left={{ xs: 'auto', lg: '50%' }}
            position={{ xs: 'relative', lg: 'sticky' }}
            width={{ xs: '100%', lg: '50%' }}>
            <Box
                sx={{
                    height: 40,
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: windowSize.documentWidth,
                }}>
                <PDFDownloadLink document={documentTemplate} fileName={`${resumeData.name}.pdf`}>
                    {() => (
                        <Button variant="outlined" size="small" sx={{ marginRight: 1 }}>
                            Download PDF
                        </Button>
                    )}
                </PDFDownloadLink>

                <BlobProvider document={documentTemplate}>
                    {({ url }) => (url ? <PDFPreviewMenu downloadUrl={url} /> : '')}
                </BlobProvider>
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: 1,
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    background: '#fff',
                    width: windowSize.documentWidth,
                    height: windowSize.documentHeight,
                    overflow: 'hidden',
                    margin: '0 auto',
                }}>
                <BlobProvider document={documentTemplate}>
                    {({ url, loading, error }) =>
                        loading || error ? (
                            <Spinner />
                        ) : (
                            <Document
                                file={url}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={<Spinner />}>
                                <Page
                                    key={`page_${page}`}
                                    pageNumber={page}
                                    width={windowSize.documentWidth}
                                    height={windowSize.documentHeight}
                                />
                            </Document>
                        )
                    }
                </BlobProvider>
            </Box>
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
    );
};

export default PDFPreview;
