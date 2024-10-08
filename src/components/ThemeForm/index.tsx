import { Box } from '@mui/material';
import BaseResumeData from './BaseResumeData';
import ChipDivider from '../ChipDivider';
import { Fonts } from './Fonts';
import { Format } from './Format';
import { Colors } from './Colors';
import { Reset } from './Reset';

const ThemeForm = () => {
    return (
        <Box
            component="form"
            sx={{
                minHeight: '100vh',
                maxHeight: '100vh',
                paddingY: 2,
                paddingX: 4,
                overflowY: 'auto',
            }}
            width={{ xs: '100vw', lg: '30vw' }}>
            <BaseResumeData />
            <ChipDivider title="Typography">
                <Fonts />
            </ChipDivider>
            <ChipDivider title="Format">
                <Format />
            </ChipDivider>
            <ChipDivider title="Colors">
                <Colors />
            </ChipDivider>
            <Reset />
        </Box>
    );
};

export default ThemeForm;
