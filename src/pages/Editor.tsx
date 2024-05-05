import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { Spinner } from '../components/Spinner';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { Stack } from '@mui/material';
import EditorForms from '../components/EditorForms';
import PDFView from '../components/PDFView';

const Editor = () => {
    const { resumeId } = useParams();

    const [resumeSnapshot, resumeLoading, resumeError] = useDocument(
        doc(db, 'resumes', resumeId || ''),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        },
    );

    if (resumeLoading) return <Spinner />;

    if (resumeError) return <ErrorSnackbar>{resumeError.message}</ErrorSnackbar>;

    if (resumeSnapshot)
        return (
            <Stack sx={{ width: '100%', flexDirection: 'row', minHeight: '100vh' }}>
                <EditorForms resumeSnapshot={resumeSnapshot} />
                <PDFView resumeSnapshot={resumeSnapshot} />
            </Stack>
        );
};

export default Editor;
