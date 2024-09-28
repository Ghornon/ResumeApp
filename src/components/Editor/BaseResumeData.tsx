import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    debounce,
} from '@mui/material';
import EditorFieldBox from './EditorFieldBox';
import { useResumeStore } from '../../store/ResumeStore';
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { TemplateStyles } from '../../types/TemplateStyles.types';

const BaseResumeData = () => {
    const name = useResumeStore((state) => state.name);
    const setName = useResumeStore((state) => state.setName);
    const templateId = useResumeStore((state) => state.templateId);
    const setTemplateId = useResumeStore((state) => state.setTemplateId);
    const setTemplateStyles = useResumeStore((state) => state.setTemplateStyles);

    const [templatesSnapshot, templateLoading] = useCollectionOnce(collection(db, 'templates'));

    const getDefaultTemplateStyles = async (templateId: string) => {
        const q = query(collection(db, 'templateStyles'), where('templateId', '==', templateId));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length) return querySnapshot.docs[0].data();

        return {};
    };

    const handleFormChange = async (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
    ) => {
        const { name, value } = event.target;

        if (name == 'name') setName(value);
        if (name == 'template') setTemplateId(value);

        debouncedSaveDocument(name, value);
    };

    const { resumeId } = useParams();
    const saveDocument = useMemo(
        () => async (name: string, value: string) => {
            if (resumeId) {
                const resumeRef = doc(db, 'resumes', resumeId);

                console.log('Saving data', resumeId, value);

                if (name == 'name')
                    updateDoc(resumeRef, { name: value, timestamp: Timestamp.now() });
                if (name == 'template') {
                    const defaultStyles = await getDefaultTemplateStyles(value);

                    setTemplateStyles(defaultStyles as TemplateStyles);

                    updateDoc(resumeRef, {
                        templateId: value,
                        timestamp: Timestamp.now(),
                        templateStyles: { ...defaultStyles },
                    });
                }
            }
        },
        [resumeId],
    );

    const debouncedSaveDocument = useMemo(
        () => debounce((name: string, value: string) => saveDocument(name, value), 1000),
        [saveDocument],
    );

    return (
        <EditorFieldBox title={'Template Options'}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Resume name"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Template</InputLabel>
                    {templateLoading ? (
                        ''
                    ) : (
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={templateId}
                            name="template"
                            label="Template"
                            onChange={handleFormChange}>
                            {templatesSnapshot?.docs.map((doc) => {
                                const { name } = doc.data();
                                return (
                                    <MenuItem value={doc.id} key={doc.id}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    )}
                </FormControl>
            </Grid>
        </EditorFieldBox>
    );
};

export default BaseResumeData;
