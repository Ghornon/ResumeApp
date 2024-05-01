import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DocumentCard from './DocumentCard';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const DocumentPane = ({
    docId,
    name,
    template,
    posterUrl,
    date,
}: {
    docId: string;
    name: string;
    template: string;
    posterUrl: string;
    date: string;
}) => {
    const handleRemove = async () => {
        await deleteDoc(doc(db, 'resumes', docId));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DocumentCard posterUrl={posterUrl} title={name} variant="outlined" />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">{name}</Typography>
                <Typography variant="subtitle1">Template: {template}</Typography>
                <Typography variant="overline">{date}</Typography>
                <Box>
                    <Button variant="text" size="small" startIcon={<ModeEditIcon />}>
                        Edit
                    </Button>
                    <Button variant="text" size="small" startIcon={<DownloadIcon />}>
                        Download
                    </Button>
                    <Button
                        variant="text"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={handleRemove}>
                        Remove
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default DocumentPane;
