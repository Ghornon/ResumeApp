import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import HeaderContent from './HeaderContent';
import logo from '../../../public/idea.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar component="header" position="fixed" color="inherit" elevation={0} sx={{display: 'flex',alignItems: 'center'}}>
            <Toolbar sx={{ display: 'flex', maxWidth: '1200px', width: '100%',alignItems: 'center' }}>
                <NavLink
                    to="/"
                    style={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <img src={logo} alt="Logo" style={{ width: '40px', height: '100%' }} />
                    <Typography variant="h6">CV Maker</Typography>
                </NavLink>
                <nav style={{ display: 'flex', gap: '20px' }}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="resumes/1">CV Maker</NavLink>
                </nav>
                <Box sx={{ flexGrow: 1 }} />
                <HeaderContent />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
