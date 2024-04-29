import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import HeaderContent from './HeaderContent';
import logo from '../../../public/idea.png';

const Header = () => {
    return (
        <AppBar component="header" position="fixed" color="inherit" elevation={0}>
            <Toolbar>
                <div style={{ flexGrow: 1, display: 'flex',  flexDirection: "row", alignItems: 'center' }}>
                    <img src={logo} alt="Logo" style={{ width: '40px', height: '100%' }} />
                    <Typography variant="h6">CV Maker</Typography>
                </div>
                <Box sx={{ flexGrow: 1 }} />
                <HeaderContent />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
