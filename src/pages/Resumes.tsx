import { Stack } from '@mui/material';
import FormResume from '../components/form/FormResume';
import ResumeView from '../components/resume/ResumeView';

const Resumes = () => {
    return (
        <Stack sx={{ width: '100%', flexDirection: 'row', gap: '1rem', minHeight: '100vh' }}>
            <FormResume />
            <ResumeView />
        </Stack>
    );
};

export default Resumes;
