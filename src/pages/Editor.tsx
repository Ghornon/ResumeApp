import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { Spinner } from '../components/Spinner';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { Stack } from '@mui/material';
import EditorForm from '../components/Editor';
import PDFPreview from '../components/PDFPreview/PDFPreview';
import { useEffect } from 'react';
import { useResumeStore } from '../store/ResumeStore';

const Editor = () => {
    const { resumeId } = useParams();

    const [resumeSnapshot, resumeLoading, resumeError] = useDocumentOnce(
        doc(db, 'resumes', resumeId || ''),
    );

    const resetState = useResumeStore((state) => state.reset);

    useEffect(() => {
        if (!resumeLoading && !resumeError) {
            const data = resumeSnapshot?.data();

            if (data) {
                useResumeStore.setState({
                    ...useResumeStore.getInitialState,
                    resumeId: resumeSnapshot?.id,
                    resume: { ...useResumeStore.getState().resume, ...data },
                });
            }
        }
    }, [resumeSnapshot, resumeLoading, resumeError, useResumeStore, resetState]);

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
