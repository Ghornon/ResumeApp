import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth/cordova';
import {
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Settings, Logout } from '@mui/icons-material';

const Profile = () => {
    const [user] = useAuthState(auth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    const handleGoToProfile = async () => {
        await handleClose();
        navigate('/profile');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'center',
                }}
                onClick={handleClick}>
                <IconButton size="small" sx={{ ml: 2 }}>
                    <Avatar
                        sx={{ width: 40, height: 40 }}
                        src={user?.photoURL || ''}
                        alt={user?.displayName || 'User Avatar'}
                    />
                </IconButton>
                <Typography
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}>
                    {user?.displayName || 'Guest'}
                </Typography>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <MenuItem onClick={handleGoToProfile}>
                    <Avatar src={user?.photoURL || ''} alt={user?.displayName || 'User Avatar'} />
                    <Typography sx={{ ml: 1 }}>Profile</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Profile;
