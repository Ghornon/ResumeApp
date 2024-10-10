import {
    FormControl,
    Grid,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
    Slider,
    Stack,
} from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';
import { FontSize } from '../../types/TemplateStyles.types';
import TextDecreaseOutlinedIcon from '@mui/icons-material/TextDecreaseOutlined';
import TextIncreaseOutlinedIcon from '@mui/icons-material/TextIncreaseOutlined';
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import { FONTS } from '../templates/getDefaultStyleSheet';

function fontValueLabelFormat(value: number) {
    return `${FontSize[value]} - ${value} pt`;
}

export const Fonts = () => {
    const templateStyles = useResumeStore((state) => state.resume.templateStyles);
    const setValue = useResumeStore((state) => state.setValue);

    return (
        <>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel htmlFor="font-select">Font</InputLabel>
                    <Select
                        fullWidth
                        id="font-select"
                        label="Font"
                        value={templateStyles.font.fontName.toString() || ''}
                        name="fontName"
                        onChange={(event) => {
                            console.log(event.target.value);
                            setValue('templateStyles.font.fontName', event.target.value);
                        }}>
                        <ListSubheader>Special</ListSubheader>
                        {Object.keys(FONTS['Special']).map((fontName) => (
                            <MenuItem value={fontName} key={`Special-${fontName}`}>
                                {fontName}
                            </MenuItem>
                        ))}
                        <ListSubheader>Sans Serif</ListSubheader>
                        {Object.keys(FONTS['Sans Serif']).map((fontName) => (
                            <MenuItem value={fontName} key={`SansSerif-${fontName}`}>
                                {fontName}
                            </MenuItem>
                        ))}
                        <ListSubheader>Serif</ListSubheader>
                        {Object.keys(FONTS['Serif']).map((fontName) => (
                            <MenuItem value={fontName} key={`Serif-${fontName}`}>
                                {fontName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel htmlFor="headline-capitalization-select">
                        Headline Capitalization
                    </InputLabel>
                    <Select
                        fullWidth
                        id="headline-capitalization-select"
                        label="Headline Capitalization"
                        value={templateStyles.font.headlineCapitalization || ''}
                        name="font.headlineCapitalization"
                        onChange={(event) =>
                            setValue(
                                'templateStyles.font.headlineCapitalization',
                                event.target.value,
                            )
                        }>
                        <MenuItem value="capitalize">Capitalize</MenuItem>
                        <MenuItem value="uppercase">Uppercase</MenuItem>
                        <MenuItem value="lowercase">Lowercase</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="font-size-slider">Font Size</InputLabel>
                <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                    <TextDecreaseOutlinedIcon />
                    <Slider
                        id="font-size-slider"
                        aria-label="Font Size"
                        value={templateStyles.font.fontSize || FontSize.M}
                        getAriaValueText={fontValueLabelFormat}
                        valueLabelFormat={fontValueLabelFormat}
                        step={1}
                        min={FontSize.XXS}
                        max={FontSize.XXL}
                        valueLabelDisplay="auto"
                        onChange={(_event, newValue) =>
                            setValue('templateStyles.font.fontSize', newValue)
                        }
                    />
                    <TextIncreaseOutlinedIcon />
                </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="line-spacing-slider">Line spacing</InputLabel>
                <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                    <DensitySmallOutlinedIcon />
                    <Slider
                        id="line-spacing-slider"
                        aria-label="Line spacing"
                        value={templateStyles.font.lineSpacing || 1.5}
                        step={0.1}
                        min={1}
                        max={2}
                        valueLabelDisplay="auto"
                        onChange={(_event, newValue) =>
                            setValue('templateStyles.font.lineSpacing', newValue)
                        }
                    />
                    <DensityMediumOutlinedIcon />
                </Stack>
            </Grid>
        </>
    );
};
