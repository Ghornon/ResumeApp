import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { Spinner } from '../components/Spinner';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { Stack } from '@mui/material';
import EditorForm from '../components/Editor/EditorForm';
import PDFPreview from '../components/PDFPreview/PDFPreview';
import { useEffect } from 'react';
import { useResumeStore } from '../store/ResumeStore';
import { ResumeType } from '../types/Resume.types';

const Editor = () => {
    const { resumeId } = useParams();

    const [resumeSnapshot, resumeLoading, resumeError] = useDocumentOnce(
        doc(db, 'resumes', resumeId || ''),
    );

    const setData = useResumeStore((state) => state.setData);
    const resetState = useResumeStore((state) => state.reset);

    useEffect(() => {
        if (!resumeLoading && !resumeError) {
            const data = resumeSnapshot?.data();
            resetState();
            if (data) setData(data as ResumeType);
        }
    }, [resumeSnapshot, resumeLoading, resumeError, setData, resetState]);

    if (resumeLoading) return <Spinner />;

    if (resumeError) return <ErrorSnackbar>{resumeError.message}</ErrorSnackbar>;

    if (resumeSnapshot)
        return (
            <Stack direction={{ sm: 'column', lg: 'row' }}>
                <EditorForm />
                <PDFPreview />
            </Stack>
        );
};

export default Editor;
