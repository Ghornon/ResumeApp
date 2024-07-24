import React, { useState } from 'react';
import { Box, Chip, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Poster from './Poster';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRemove = async () => {
        await deleteDoc(doc(db, 'resumes', docId));
        handleMenuClose();
    };

    return (
        <Grid container>
            <Box
                component={Grid}
                item
                xs={12}
                sm={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'center',
                    padding: 6,
                    backgroundColor: blueGrey[50],
                    boxShadow: 'inset 0 -100px 100px -80px rgb(217, 217, 217)',
                    position: 'relative',
                }}>
                <Poster posterUrl={posterUrl} title={name} variant="outlined" />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                    <Typography variant="subtitle2">{name}</Typography>
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                    <Chip
                        label={`Last update ${date}`}
                        color="primary"
                        size="small"
                        variant="outlined"
                        sx={{ mt: 1 }}
                    />
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <IconButton
                        aria-controls={open ? 'menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        PaperProps={{
                            elevation: 4,
                            sx: {
                                overflow: 'visible',
                                mt: 1.5,
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                        <MenuItem
                            onClick={() => {
                                navigate(`/editor/${docId}`);
                                handleMenuClose();
                            }}>
                            <ModeEditIcon sx={{ mr: 1 }} /> Edit
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <DownloadIcon sx={{ mr: 1 }} /> Download
                        </MenuItem>
                        <MenuItem onClick={handleRemove}>
                            <DeleteIcon sx={{ mr: 1 }} /> Remove
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Grid>
    );
};

export default ResumeTab;
