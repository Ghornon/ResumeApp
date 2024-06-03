import { Box } from '@mui/material';
import { PersonalDetails } from './PersonalDetails';
import { HistoryItem } from './HistoryItem';
import EditorFieldBox from './EditorFieldBox';
import BaseResumeData from './BaseResumeData';
import Summary from './Summary';
import { Skills } from './SkillIs';
import { Languages } from './Languages';

const EditorForm = () => {
    return (
        <Box
            component="form"
            sx={{
                maxHeight: '100vh',
                paddingY: 2,
                overflowY: 'scroll',
            }}
            width={{ xs: '100%', md: '50%' }}>
            <BaseResumeData />

            <EditorFieldBox title="Personal Details">
                <PersonalDetails />
            </EditorFieldBox>

            <EditorFieldBox title="Summary">
                <Summary />
            </EditorFieldBox>

            <EditorFieldBox title="Employment History">
                <HistoryItem type={'employmentHistory'} />
            </EditorFieldBox>

            <EditorFieldBox title="Education History">
                <HistoryItem type={'educationHistory'} />
            </EditorFieldBox>

            <EditorFieldBox title="Skills">
                <Skills />
            </EditorFieldBox>

            <EditorFieldBox title="Languages">
                <Languages />
            </EditorFieldBox>
        </Box>
    );
};

export default EditorForm;
