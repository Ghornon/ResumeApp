import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Spinner } from '../../components/Spinner';
import ErrorSnackbar from '../../components/ErrorSnackbar';

const Editor = () => {
    const { resumeId } = useParams();
    const auth = getAuth();
    const user = auth.currentUser;

    const [resumeSnapshot, resumeLoading, resumeError] = useDocument(
        doc(db, 'resumes', resumeId || ''),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        },
    );

    const [formData, setFormData] = useState({
        title: '',
        userId: '',
    });

    const handleFormChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    if (resumeLoading) return <Spinner />;

    if (resumeError) return <ErrorSnackbar>{resumeError.message}</ErrorSnackbar>;

    return <div>{JSON.stringify(resumeSnapshot?.data())}</div>;
};

export default Editor;
