import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Poster from './Poster';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { blueGrey } from '@mui/material/colors';

const ResumeTab = ({
    docId,
    name,
    posterUrl,
    date,
}: {
    docId: string;
    name: string;
    posterUrl: string;
    date: string;
}) => {
    const navigate = useNavigate();
    const handleRemove = async () => {
        await deleteDoc(doc(db, 'resumes', docId));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                        backgroundColor: blueGrey[50],
                    }}>
                    <Poster posterUrl={posterUrl} title={name} variant="outlined" />
                </Box>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Typography variant="subtitle2">{name}</Typography>
                <Stack direction="row">
                    <Chip
                        label={`Updated ${date}`}
                        color="primary"
                        size="small"
                        variant="outlined"
                    />
                </Stack>
                {/* <Typography variant="caption">Updated {date}</Typography> */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 1,
                    }}>
                    <Button
                        variant="text"
                        size="small"
                        startIcon={<ModeEditIcon />}
                        onClick={() => navigate(`/editor/${docId}`)}>
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

export default ResumeTab;
