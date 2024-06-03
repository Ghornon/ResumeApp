import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { Spinner } from '../components/Spinner';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { Stack } from '@mui/material';
import EditorForm from '../components/Editor/EditorForm';
import PDFView from '../components/Editor/PDFView';
import { useEffect } from 'react';
import { useResumeStore } from '../store/ResumeStore';

const Editor = () => {
    const { resumeId } = useParams();

    const [resumeSnapshot, resumeLoading, resumeError] = useDocumentOnce(
        doc(db, 'resumes', resumeId || ''),
    );

    const setData = useResumeStore((state) => state.setData);
    const setDocId = useResumeStore((state) => state.setDocId);

    useEffect(() => {
        if (!resumeLoading && !resumeError) {
            const data = resumeSnapshot?.data();
            setDocId(resumeId);
            setData(data);
        }
    }, [resumeSnapshot, resumeLoading, resumeError]);

    if (resumeLoading) return <Spinner />;

    if (resumeError) return <ErrorSnackbar>{resumeError.message}</ErrorSnackbar>;

    if (resumeSnapshot)
        return (
            <Stack sx={{ minHeight: '100vh' }} direction={{ sm: 'column', md: 'row' }}>
                <EditorForm />
                <PDFView />
            </Stack>
        );
};

export default Editor;
