import { Box, Grid, InputAdornment, Radio, TextField } from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';
import { Brightness1 } from '@mui/icons-material';

export const Colors = () => {
    const colors = useResumeStore((state) => state.resume.templateStyles.colors);
    const setValue = useResumeStore((state) => state.setValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('templateStyles.colors.highlightColor', event.target.value);
    };

    const controlProps = (item: string) => ({
        checked: colors.highlightColor === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button',
        inputProps: { 'aria-label': item },
    });

    const themeColors = [
        '#000000',
        '#313C4E',
        '#475569',
        '#57534e',
        '#dc2626',
        '#ea580c',
        '#d97706',
        '#ca8a04',
        '#65a30d',
        '#16a34a',
        '#059669',
        '#0d9488',
        '#0891b2',
        '#03a9f4',
        '#0284c7',
        '#2563eb',
        '#4f46e5',
        '#7c3aed',
        '#9333ea',
        '#c026d3',
        '#db2777',
        '#e11d48',
    ];

    return (
        <>
            <Grid item xs={12} sm={12}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'inline-flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        paddingBottom: 2,
                    }}>
                    {themeColors.map((currentColor) => (
                        <Box key={currentColor}>
                            <Radio
                                {...controlProps(currentColor)}
                                sx={{
                                    color: currentColor,
                                    '&.Mui-checked': {
                                        color: currentColor,
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    label="Highlight Color"
                    name="highlightColor"
                    value={colors.highlightColor}
                    onChange={(event) =>
                        setValue('templateStyles.colors.highlightColor', event.target.value)
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Brightness1 sx={{ color: colors.highlightColor }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    name="bgColor"
                    label="Background color"
                    value={colors.bgColor}
                    onChange={(event) =>
                        setValue('templateStyles.colors.bgColor', event.target.value)
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Brightness1 sx={{ color: colors.bgColor }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    name="fontColor"
                    label="Font color"
                    value={colors.fontColor}
                    onChange={(event) =>
                        setValue('templateStyles.colors.fontColor', event.target.value)
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Brightness1 sx={{ color: colors.fontColor }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="outlined"
                />
            </Grid>
        </>
    );
};
