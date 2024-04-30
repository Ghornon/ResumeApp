import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DocumentPane from '../components/DocumentPane';

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

export default function DocumentTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
                    <Grid item xs={12} md={6}>
                        <DocumentPane />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DocumentPane />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DocumentPane />
                    </Grid>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
        </Box>
    );
}
