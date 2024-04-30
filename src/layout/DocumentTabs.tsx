import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DocumentPane from '../components/DocumentPane';
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../config/firebase';
import { Spinner } from '../components/Spinner';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { getAuth } from 'firebase/auth';

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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DocumentTabs = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const auth = getAuth();
    const user = auth.currentUser;

    const [resumesSnapshot, loading, error] = useCollection(
        query(collection(db, 'resumes'), where('uid', '==', user?.uid)),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        },
    );

    if (loading) return <Spinner />;

    if (error) return <ErrorSnackbar>{error.message}</ErrorSnackbar>;

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography
                    variant="h5"
                    sx={{ textTransform: 'uppercase', color: 'primary', fontWeight: 'bold' }}>
                    Documents
                </Typography>
                <Button variant="outlined" startIcon={<AddIcon />}>
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
                        const { name, template, timestamp } = doc.data();
                        console.log(name, template);
                        const date = new Date(timestamp.seconds * 1000).toLocaleDateString();
                        return (
                            <Grid item xs={12} md={6}>
                                <DocumentPane
                                    key={doc.id}
                                    docId={doc.id}
                                    name={name}
                                    template={template}
                                    date={date}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
        </Box>
    );
};

export default DocumentTabs;
