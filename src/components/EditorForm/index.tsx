import { Box } from '@mui/material';
import { PersonalDetails } from './PersonalDetails';
import { HistoryItem } from './HistoryItem';
import ChipDivider from '../ChipDivider';
import Summary from './Summary';
import { Skills } from './SkillIs';
import { Languages } from './Languages';
import Navbar from './Navbar';
import Footer from './Footer';
import ResumeScore from './ResumeScore';

const EditorForm = () => {
    return (
        <Box
            component="form"
            sx={{
                minHeight: '100vh',
                maxHeight: '100vh',
                paddingY: 2,
                paddingX: 4,
                overflowY: 'auto',
            }}
            width={{ xs: '100vw', lg: '30vw' }}>
            <Navbar />

            <ResumeScore />

            <ChipDivider title="Personal Details">
                <PersonalDetails />
            </ChipDivider>

            <ChipDivider title="Summary">
                <Summary />
            </ChipDivider>

            <ChipDivider title="Employment History">
                <HistoryItem type={'employmentHistory'} />
            </ChipDivider>

            <ChipDivider title="Education History">
                <HistoryItem type={'educationHistory'} />
            </ChipDivider>

            <ChipDivider title="Skills">
                <Skills />
            </ChipDivider>

            <ChipDivider title="Languages">
                <Languages />
            </ChipDivider>

            <ChipDivider title="Footer">
                <Footer />
            </ChipDivider>
        </Box>
    );
};

export default EditorForm;
