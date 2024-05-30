import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { Spinner } from '../components/Spinner';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { Stack } from '@mui/material';
import EditorForms from '../components/EditorForms';
import PDFView from '../components/PDFView';
import { useEffect, useState } from 'react';
import { ResumeType } from '../types/Resume.types';

const Editor = () => {
    const { resumeId } = useParams();

    const [resumeSnapshot, resumeLoading, resumeError] = useDocumentOnce(
        doc(db, 'resumes', resumeId || ''),
    );

    const [resumeData, setResumeData] = useState({
        personalDetails: {
            jobTitle: '',
            photoUrl: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            country: '',
            city: '',
        },
        name: '',
        summary: '',
    } as ResumeType);

    useEffect(() => {
        console.log('Loading data from firestore');
        if (!resumeLoading) {
            const data = resumeSnapshot?.data();
            setResumeData({
                ...resumeData,
                ...data,
            });
        }
    }, [resumeSnapshot]);

    if (resumeLoading) return <Spinner />;

    if (resumeError) return <ErrorSnackbar>{resumeError.message}</ErrorSnackbar>;

    if (resumeSnapshot)
        return (
            <Stack sx={{ minHeight: '100vh' }} direction={{ sm: 'column', md: 'row' }}>
                <EditorForms resumeData={resumeData} setResumeData={setResumeData} />
                <PDFView resumeData={resumeData} />
            </Stack>
        );
};

export default Editor;
