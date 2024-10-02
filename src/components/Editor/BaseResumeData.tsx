import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import EditorFieldBox from './EditorFieldBox';
import { useResumeStore } from '../../store/ResumeStore';
import { db } from '../../config/firebase';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

const BaseResumeData = () => {
    const name = useResumeStore((state) => state.resume.name);
    const templateId = useResumeStore((state) => state.resume.templateId);
    const setValue = useResumeStore((state) => state.setValue);

    const [templatesSnapshot, templateLoading] = useCollectionOnce(collection(db, 'templates'));

    return (
        <EditorFieldBox title={'Template Options'}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Resume name"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => setValue('name', event.target.value)}
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
                            onChange={(event) => setValue('templateId', event.target.value)}>
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
