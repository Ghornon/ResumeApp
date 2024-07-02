import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ResumeTab from './ResumeTab';
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../config/firebase';
import { Spinner } from './Spinner';
import ErrorSnackbar from './ErrorSnackbar';
import { getAuth } from 'firebase/auth';
import TemplateTab from './TemplateTab';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DocumentTabPanel = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const auth = getAuth();
    const user = auth.currentUser;

    const [resumesSnapshot, resumesLoading, resumesError] = useCollection(
        query(collection(db, 'resumes'), where('uid', '==', user?.uid)),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        },
    );

    const [templatesSnapshot, templateLoading, templateError] = useCollection(
        collection(db, 'templates'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        },
    );

    if (resumesLoading || templateLoading) return <Spinner />;

    if (resumesError || templateError)
        return <ErrorSnackbar>{resumesError?.message || templateError?.message}</ErrorSnackbar>;

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography
                    variant="h5"
                    sx={{ textTransform: 'uppercase', color: 'primary', fontWeight: 'bold' }}>
                    Documents
                </Typography>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setValue(1)}>
                    Add new
                </Button>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="My Resumes" {...a11yProps(0)} />
                    <Tab label="Templates" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    {resumesSnapshot?.docs.map((doc) => {
                        const { name, timestamp, posterUrl } = doc.data();
                        const date = new Date(timestamp.seconds * 1000).toLocaleDateString();
                        return (
                            <Grid item xs={12} sm={6} md={4} key={doc.id}>
                                <ResumeTab
                                    docId={doc.id}
                                    name={name}
                                    posterUrl={posterUrl}
                                    date={date}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Grid container spacing={2}>
                    {templatesSnapshot?.docs.map((doc) => {
                        const { name, description, posterUrl, tags } = doc.data();
                        return (
                            <Grid item xs={12} sm={6} md={4} key={doc.id}>
                                <TemplateTab
                                    templateId={doc.id}
                                    name={name}
                                    description={description}
                                    posterUrl={posterUrl}
                                    tags={tags}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </CustomTabPanel>
        </Box>
    );
};

export default DocumentTabPanel;
