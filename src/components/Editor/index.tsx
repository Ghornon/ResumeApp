import { Box } from '@mui/material';
import { PersonalDetails } from './PersonalDetails';
import { HistoryItem } from './HistoryItem';
import EditorFieldBox from './EditorFieldBox';
import BaseResumeData from './BaseResumeData';
import Summary from './Summary';
import { Skills } from './SkillIs';
import { Languages } from './Languages';
import Navbar from './Navbar';
import Footer from './Footer';

const EditorForm = () => {
    return (
        <Box
            component="form"
            sx={{
                minHeight: '100vh',
                paddingY: 2,
            }}
            width={{ xs: '100vw', lg: '50vw' }}
            paddingX={{ xs: 3, md: 5, xl: 10 }}>
            <Navbar />

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

            <EditorFieldBox title="Footer">
                <Footer />
            </EditorFieldBox>
        </Box>
    );
};

export default EditorForm;
