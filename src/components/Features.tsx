import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import MuiChip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import mobilePicture from '../assets/images/mobile.png';
import mobileAndTablet from '../assets/images/mobileAndTablet.png';
import desktopAndMobile from '../assets/images/desktopAndMobile.png';

import {
    DashboardCustomizeRounded,
    DesignServicesRounded,
    MobileFriendlyRounded,
} from '@mui/icons-material';

const items = [
    {
        icon: <DashboardCustomizeRounded />,
        title: 'Resume builder',
        description:
            'With the resume creator on the resucraft platform, you can easily prepare the documents needed to apply for your dream job. Choose from hundreds of free professionally designed templates that you can customize to your needs with just a few clicks.',
        image: desktopAndMobile,
    },
    {
        icon: <MobileFriendlyRounded />,
        title: 'Mobile integration',
        description:
            'Our application is available in a mobile version, designed with a mobile-first approach to ensure a seamless and intuitive user experience on all devices. From browsing to interaction, everything is optimized for mobile users. Enjoy the full functionality and sleek design tailored to your mobile needs.',
        image: mobilePicture,
    },
    {
        icon: <DesignServicesRounded />,
        title: 'Rich in features, not in pricing.',
        description:
            "Choose from free, professionally designed templates that you can customize in minutes to suit your needs. Just a few clicks to change colors, fonts, or layout, add graphic elements, and tailor your resume to the job posting you're applying for.",
        image: mobileAndTablet,
    },
];

interface ChipProps {
    selected?: boolean;
}

const Chip = styled(MuiChip)<ChipProps>(({ theme }) => ({
    variants: [
        {
            props: ({ selected }) => selected,
            style: {
                background:
                    'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
                color: 'hsl(0, 0%, 100%)',
                borderColor: theme.palette.primary.light,
                '& .MuiChip-label': {
                    color: 'hsl(0, 0%, 100%)',
                },
                ...theme.applyStyles('dark', {
                    borderColor: theme.palette.primary.dark,
                }),
            },
        },
    ],
}));

interface MobileLayoutProps {
    selectedItemIndex: number;
    handleItemClick: (index: number) => void;
    selectedFeature: (typeof items)[0];
}

export function MobileLayout({
    selectedItemIndex,
    handleItemClick,
    selectedFeature,
}: MobileLayoutProps) {
    if (!items[selectedItemIndex]) {
        return null;
    }

    return (
        <Box
            sx={{
                display: { xs: 'flex', sm: 'none' },
                flexDirection: 'column',
                gap: 2,
            }}>
            <Box
                sx={{
                    maxWidth: '100%',
                    textAlign: 'center',
                }}>
                {items.map(({ title }, index) => (
                    <Chip
                        sx={{ marginLeft: 1, marginTop: 1 }}
                        size="medium"
                        key={index}
                        label={title}
                        onClick={() => handleItemClick(index)}
                        selected={selectedItemIndex === index}
                    />
                ))}
            </Box>
            <Card variant="outlined">
                <Box
                    component="img"
                    src={items[selectedItemIndex].image}
                    alt={items[selectedItemIndex].title}
                    sx={() => ({
                        mb: 2,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: 180,
                    })}
                />
                <Box sx={{ px: 2, pb: 2 }}>
                    <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                        {selectedFeature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                        {selectedFeature.description}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
}

const Features = () => {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

    const handleItemClick = (index: number) => {
        setSelectedItemIndex(index);
    };

    const selectedFeature = items[selectedItemIndex];

    return (
        <Box id="features" sx={{ py: { xs: 8, sm: 16 } }}>
            <Box sx={{ width: { sm: '100%', md: '60%' } }}>
                <Typography component="h2" variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                    A free resume builder
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}>
                    A free and open-source resume builder that simplifies the process of creating,
                    updating, and sharing your resume.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row-reverse' },
                    gap: 2,
                }}>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 2,
                        width: '100%',
                        height: '100%',
                    }}>
                    {items.map(({ icon, title, description }, index) => (
                        <Box
                            key={index}
                            component={Button}
                            onClick={() => handleItemClick(index)}
                            sx={[
                                (theme) => ({
                                    p: 2,
                                    height: '100%',
                                    width: '100%',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                }),
                                selectedItemIndex === index && {
                                    backgroundColor: 'action.selected',
                                },
                            ]}>
                            <Box
                                sx={[
                                    {
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'left',
                                        gap: 1,
                                        textAlign: 'left',
                                        textTransform: 'none',
                                        color: 'text.secondary',
                                    },
                                    selectedItemIndex === index && {
                                        color: 'text.primary',
                                    },
                                ]}>
                                {icon}

                                <Typography variant="h6">{title}</Typography>
                                <Typography variant="body2">{description}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <MobileLayout
                    selectedItemIndex={selectedItemIndex}
                    handleItemClick={handleItemClick}
                    selectedFeature={selectedFeature}
                />

                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        width: '100%',
                        height: 'var(--items-image-height)',
                    }}>
                    <Card
                        variant="outlined"
                        sx={{
                            height: '100%',
                            width: '100%',
                            display: { xs: 'none', sm: 'flex' },
                            pointerEvents: 'none',
                        }}>
                        <Box
                            sx={{
                                m: 'auto',
                                width: 420,
                                height: 420,
                                backgroundSize: 'contain',
                            }}
                            component="img"
                            src={items[selectedItemIndex].image}
                            alt={items[selectedItemIndex].title}
                        />
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default Features;
