import { Box, Tabs, Tab } from '@mui/material';
import { PersonalDetails } from './PersonalDetails';
import { HistoryItem } from './HistoryItem';
import EditorFieldBox from './EditorFieldBox';
import BaseResumeData from './BaseResumeData';
import Summary from './Summary';
import { Skills } from './SkillIs';
import { Languages } from './Languages';
import Navbar from './Navbar';
import Footer from './Footer';
import { useState } from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const EditorForm = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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

            <Tabs value={value} onChange={handleChange} aria-label="Menu" variant="fullWidth">
                <Tab
                    label="Fill in"
                    {...a11yProps(0)}
                    icon={<CreateOutlinedIcon />}
                    iconPosition="start"
                />

                <Tab
                    label="Design"
                    {...a11yProps(1)}
                    icon={<BrushOutlinedIcon />}
                    iconPosition="start"
                />
            </Tabs>
            <TabPanel value={value} index={0}>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* <EditorFieldBox title="Design">
                    <TemplateDesignSettings />
                </EditorFieldBox> */}
            </TabPanel>
        </Box>
    );
};

export default EditorForm;
