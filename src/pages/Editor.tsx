import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { Spinner } from '../components/Spinner';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { BottomNavigation, BottomNavigationAction, Stack, useMediaQuery } from '@mui/material';
import EditorForm from '../components/EditorForm';
import PDFPreview from '../components/PDFPreview/PDFPreview';
import { useEffect, useState } from 'react';
import { useResumeStore } from '../store/ResumeStore';
import ThemeForm from '../components/ThemeForm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { DesignServices, PictureAsPdf } from '@mui/icons-material';

const Editor = () => {
    const [nav, setNav] = useState('EditorForm');
    const isMobile = useMediaQuery('(max-width:1199px)');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setNav(newValue);
        console.log(newValue);
    };

    const { resumeId } = useParams();

    const [resumeSnapshot, resumeLoading, resumeError] = useDocumentOnce(
        doc(db, 'resumes', resumeId || ''),
    );

    useEffect(() => {
        if (!resumeLoading && !resumeError) {
            const data = resumeSnapshot?.data();

            if (data) {
                useResumeStore.getState().reset();
                useResumeStore.setState({
                    ...useResumeStore.getInitialState,
                    resumeId: resumeSnapshot?.id,
                    resume: {
                        ...useResumeStore.getState().resume,
                        ...data,
                        templateStyles: {
                            ...useResumeStore.getState().resume.templateStyles,
                            ...data.templateStyles,
                        },
                    },
                });
            }
        }
    }, [resumeSnapshot, resumeLoading, resumeError, useResumeStore]);

    if (resumeLoading) return <Spinner />;

    if (resumeError) return <ErrorSnackbar>{resumeError.message}</ErrorSnackbar>;

    if (isMobile)
        return (
            <>
                <Stack
                    direction={{ sm: 'column', lg: 'row' }}
                    sx={{ paddingBottom: nav == 'PDFPreview' ? 0 : 8 }}>
                    {nav == 'EditorForm' ? <EditorForm /> : null}
                    {nav == 'PDFPreview' ? <PDFPreview /> : null}
                    {nav == 'ThemeForm' ? <ThemeForm /> : null}
                </Stack>

                <BottomNavigation
                    value={nav}
                    onChange={handleChange}
                    sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}
                    showLabels
                    component="nav">
                    <BottomNavigationAction
                        label="Forms"
                        value="EditorForm"
                        icon={<EditNoteIcon />}
                    />
                    <BottomNavigationAction
                        label="Preview"
                        value="PDFPreview"
                        icon={<PictureAsPdf />}
                    />
                    <BottomNavigationAction
                        label="Theme"
                        value="ThemeForm"
                        icon={<DesignServices />}
                    />
                </BottomNavigation>
            </>
        );

    return (
        <Stack direction={{ sm: 'column', lg: 'row' }}>
            <EditorForm />
            <PDFPreview />
            <ThemeForm />
        </Stack>
    );
};

export default Editor;
