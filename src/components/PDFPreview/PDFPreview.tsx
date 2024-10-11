import { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { usePDF } from '@react-pdf/renderer';
import { Box, Button, Pagination } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Spinner } from '../Spinner';
import { useResumeStore } from '../../store/ResumeStore';
import PDFPreviewMenu from './PDFPreviewMenu';
import { Link } from 'react-router-dom';
import './PDFView.scss';
import TemplateEngine from '../templates/TemplateEngine';

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
    const resumeData = useResumeStore((state) => state.resume);
    const [numPages, setNumPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const [previousRenderValue, setPreviousRenderValue] = useState<string | null | undefined>(null);

    const onDocumentLoadSuccess = ({ numPages: nextNumPages }: PDFDocumentProxy): void => {
        setNumPages(nextNumPages);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const [instance, updateInstance] = usePDF({
        document: <TemplateEngine resumeData={resumeData} />,
    });

    useEffect(() => {
        updateInstance(<TemplateEngine resumeData={resumeData} />);
    }, [resumeData]);

    const isFirstRendering = !previousRenderValue;

    const isLatestValueRendered = previousRenderValue === instance.url;
    const isBusy = instance.loading || !isLatestValueRendered;

    const shouldShowPreviousDocument = !isFirstRendering && isBusy;

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
                minHeight: '100vh',
                maxHeight: '100vh',
                margin: '0 auto',
                paddingY: 4,
            }}
            width={{ xs: '100vw', lg: '40vw' }}>
            <Box
                sx={{
                    height: 40,
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: windowSize.documentWidth,
                }}>
                <Link
                    to={instance.url ? instance.url : ''}
                    download={`${resumeData.name}.pdf`}
                    target="_blank"
                    rel="noreferrer">
                    <Button variant="outlined" size="small" sx={{ marginRight: 1 }}>
                        Download PDF
                    </Button>
                </Link>

                <PDFPreviewMenu url={instance.url} />
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
                {shouldShowPreviousDocument && previousRenderValue ? (
                    <Document
                        key={previousRenderValue}
                        className="previous-document"
                        file={previousRenderValue}
                        loading={null}>
                        <Page
                            key={`page_${currentPage}`}
                            pageNumber={currentPage}
                            width={windowSize.documentWidth}
                            height={windowSize.documentHeight}
                        />
                    </Document>
                ) : null}

                {instance.loading ? (
                    <Spinner />
                ) : (
                    <Document
                        key={instance.url}
                        className={shouldShowPreviousDocument ? 'rendering-document' : null}
                        file={instance.url}
                        loading={isFirstRendering ? <Spinner /> : null}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(error) =>
                            alert('Error while loading document! ' + error.message)
                        }
                        onSourceError={(error) =>
                            alert('Error while retrieving document source! ' + error.message)
                        }>
                        <Page
                            key={`page_${currentPage}`}
                            pageNumber={currentPage}
                            width={windowSize.documentWidth}
                            height={windowSize.documentHeight}
                            onRenderSuccess={() => setPreviousRenderValue(instance.url)}
                        />
                    </Document>
                )}
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
