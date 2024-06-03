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
import { ResumeType } from '../types/Resume.types';

const Editor = () => {
    const { resumeId } = useParams();

    const [resumeSnapshot, resumeLoading, resumeError] = useDocumentOnce(
        doc(db, 'resumes', resumeId || ''),
    );

    const setData = useResumeStore((state) => state.setData);

    useEffect(() => {
        if (!resumeLoading && !resumeError) {
            const data = resumeSnapshot?.data();
            if (data) setData(data as ResumeType);
        }
    }, [resumeSnapshot, resumeLoading, resumeError, setData]);

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
