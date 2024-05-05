import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth/cordova';
import { Box, IconButton } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
const Profile = () => {
    const [user] = useAuthState(auth);
    const logout = async () => {
        await signOut(auth);
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Link to="/profile">{user?.displayName ? user.displayName : 'Guest'}</Link>
            <IconButton size="large" color="secondary" onClick={logout}>
                <LogoutOutlined />
            </IconButton>
        </Box>
    );
};

export default Profile;
