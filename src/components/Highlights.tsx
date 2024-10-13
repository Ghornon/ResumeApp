import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import {
    ColorLensRounded,
    DevicesRounded,
    PictureAsPdfRounded,
    StarRounded,
    TipsAndUpdatesRounded,
} from '@mui/icons-material';

const items = [
    {
        icon: <StarRounded />,
        title: 'User-Friendly Interface',
        description:
            'Create resumes effortlessly with our intuitive drag-and-drop interface designed for everyone, regardless of tech skill.',
    },
    {
        icon: <ColorLensRounded />,
        title: 'Customizable Templates',
        description:
            'Choose from a variety of professionally designed templates that you can easily customize to reflect your personal brand.',
    },
    {
        icon: <DevicesRounded />,
        title: 'Multi-Platform Support',
        description:
            'Access and edit your resume from any device—desktop, tablet, or smartphone—ensuring you’re always prepared.',
    },
    {
        icon: <PictureAsPdfRounded />,
        title: 'Export Options',
        description:
            'Download your resume in most popular PDF format to suit any application requirement with just a click.',
    },
    {
        icon: <SettingsSuggestRoundedIcon />,
        title: 'ATS Optimization',
        description:
            'Learn how to tailor your resume for Applicant Tracking Systems with expert tips on formatting, keyword usage, and content structure to ensure your application gets noticed.',
    },
    {
        icon: <TipsAndUpdatesRounded />,
        title: 'Guided Content Suggestions',
        description:
            'Get intelligent suggestions for skills and experiences tailored to your industry, helping you highlight your best attributes',
    },
];

export default function Highlights() {
    return (
        <Box
            id="highlights"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
            }}>
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 6 },
                }}>
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: { sm: 'left', md: 'center' },
                    }}>
                    <Typography component="h2" variant="h4" gutterBottom>
                        Highlights
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Features designed to help you win your dream job
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Build your brand-new resume in as little as 5 minutes.
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {items.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Stack
                                direction="column"
                                component={Card}
                                spacing={1}
                                useFlexGap
                                sx={{
                                    color: 'inherit',
                                    p: 3,
                                    height: '100%',
                                }}>
                                <Box sx={{ opacity: '70%' }}>{item.icon}</Box>
                                <div>
                                    <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {item.description}
                                    </Typography>
                                </div>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
