import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { Box } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useResumeStore } from '../../store/ResumeStore';

const Navbar = () => {
    const name = useResumeStore((state) => state.name);

    return (
        <Box
            role="presentation"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: 2 }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/">
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                </Link>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/resumes">
                    <ArticleOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Resumes
                </Link>
                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                    <EditOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    {name || 'New Resume'}
                </Typography>
            </Breadcrumbs>
        </Box>
    );
};

export default Navbar;
