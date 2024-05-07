import { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import ExampleTemplate from './templates/example/ExampleTemplate';
import { BlobProvider } from '@react-pdf/renderer';
import { DocumentSnapshot } from 'firebase/firestore';
import { Box, Container } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Spinner } from './Spinner';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

const PDFView = ({ resumeSnapshot }: { resumeSnapshot: DocumentSnapshot }) => {
    const [numPages, setNumPages] = useState<number>();
    const [windowSize, setWindowSize] = useState(getWindowSize());

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                background: blueGrey[50],
                width: '50%',
            }}>
            <Container
                sx={{
                    width: 'auto',
                }}>
                <Box
                    sx={{
                        borderRadius: 1,
                        overflow: 'hidden',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                        background: '#fff',
                        height: windowSize.innerHeight - 60,
                        width: (windowSize.innerHeight - 60) * (210 / 297),
                    }}>
                    <BlobProvider document={<ExampleTemplate resumeSnapshot={resumeSnapshot} />}>
                        {({ url, loading, error }) =>
                            loading || error ? (
                                <Spinner />
                            ) : (
                                <Document
                                    file={url}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    loading={<Spinner />}>
                                    {Array.from(new Array(numPages), (el, index) => (
                                        <Page
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                            height={windowSize.innerHeight - 60}
                                        />
                                    ))}
                                </Document>
                            )
                        }
                    </BlobProvider>
                </Box>
            </Container>
        </Box>
    );
};

export default PDFView;
