import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DocumentCard from './DocumentCard';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
const DocumentPane = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DocumentCard />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Title</Typography>
                <Typography variant="overline">{Date()}</Typography>
                <Box>
                    <Button variant="text" size="small" startIcon={<ModeEditIcon />}>
                        Edit
                    </Button>
                    <Button variant="text" size="small" startIcon={<DownloadIcon />}>
                        Download
                    </Button>
                    <Button variant="text" size="small" startIcon={<DeleteIcon />}>
                        Remove
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default DocumentPane;
