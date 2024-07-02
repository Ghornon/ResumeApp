import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    BottomNavigation,
    BottomNavigationAction,
    useMediaQuery,
} from '@mui/material';
import { InsertDriveFile, Home, Email } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import HeaderContent from './HeaderContent';
import logo from '../../../public/idea.png';

const Header = () => {
    const isMobile = useMediaQuery('(max-width:720px)');

    return (
        <AppBar
            component="header"
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{ display: 'flex', alignItems: 'center' }}>
            <Toolbar
                sx={{ display: 'flex', maxWidth: '1200px', width: '100%', alignItems: 'center' }}>
                <NavLink
                    to="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="Logo" style={{ width: '40px', height: 'auto' }} />
                    </Box>
                    <Box sx={{ ml: 2, textAlign: 'right' }}>
                        <Typography variant="h5" sx={{ whiteSpace: 'nowrap' }}>
                            CV Maker
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color="gray"
                            sx={{ fontSize: '10px', mt: -1 }}>
                            by Dreamteam
                        </Typography>
                    </Box>
                </NavLink>
                <Box sx={{ flexGrow: 1 }} />
                {isMobile ? (
                    <BottomNavigation
                        value={false}
                        onChange={() => {}}
                        sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}
                        showLabels
                        component="nav">
                        <BottomNavigationAction
                            label="Home"
                            icon={<Home />}
                            component={NavLink}
                            to="/"
                        />
                        <BottomNavigationAction
                            label="Resume"
                            icon={<InsertDriveFile />}
                            component={NavLink}
                            to="/resume-templates"
                        />
                        <BottomNavigationAction
                            label="Cover Letter"
                            icon={<Email />}
                            component={NavLink}
                            to="/cover-letter-templates"
                        />
                    </BottomNavigation>
                ) : (
                    <Box component="nav" sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/resume-templates">Resume</NavLink>
                        <NavLink to="/cover-letter-templates">Cover Letter</NavLink>
                    </Box>
                )}
                <HeaderContent />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
