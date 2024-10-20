import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    BottomNavigation,
    BottomNavigationAction,
    useMediaQuery,
    Tabs,
    Tab,
} from '@mui/material';
import {
    InsertDriveFile,
    Home,
    Email,
    Description,
    Article,
    DocumentScanner,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import HeaderContent from './HeaderContent';
import logo from '../../assets/images/idea.png';
import { useState } from 'react';

const Header = () => {
    const [nav, setNav] = useState(location.pathname);
    const isMobile = useMediaQuery('(max-width:720px)');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setNav(newValue);
    };

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
                    <Box sx={{ ml: 1, textAlign: 'right' }}>
                        <Typography
                            variant="h5"
                            sx={{
                                whiteSpace: 'nowrap',
                                fontWeight: 800,
                                textShadow: '1px 3px 3px rgba(198, 198, 198, 0.3)',
                                background: 'linear-gradient(to right, #4bd2d2, #3ca8a8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block',
                            }}>
                            resucraft
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
                        value={nav}
                        onChange={handleChange}
                        sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}
                        showLabels
                        component="nav">
                        <BottomNavigationAction
                            label="Home"
                            icon={<Home />}
                            component={NavLink}
                            value="/"
                            to="/"
                        />
                        <BottomNavigationAction
                            label="Resume"
                            icon={<Article />}
                            component={NavLink}
                            value="/resumes"
                            to="/resumes"
                        />
                        <BottomNavigationAction
                            label="Parser"
                            icon={<DocumentScanner />}
                            component={NavLink}
                            value="/parser"
                            to="/parser"
                        />
                    </BottomNavigation>
                ) : (
                    <Box component="nav" sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
                        <Tabs aria-label="Nav" value={nav} onChange={handleChange}>
                            <Tab label="Home" value="/" component={NavLink} to="/" />
                            <Tab
                                label="Resumes"
                                value="/resumes"
                                component={NavLink}
                                to="/resumes"
                            />
                            <Tab label="Parser" value="/parser" component={NavLink} to="/parser" />
                        </Tabs>
                    </Box>
                )}
                <HeaderContent />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
