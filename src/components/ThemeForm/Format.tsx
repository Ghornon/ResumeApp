import {
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
} from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';

export const Format = () => {
    const format = useResumeStore((state) => state.resume.templateStyles.format);
    const setValue = useResumeStore((state) => state.setValue);

    return (
        <>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel htmlFor="date-format-select">Date format</InputLabel>
                    <Select
                        fullWidth
                        id="date-format-select"
                        label="Date format"
                        value={format.dateFormat}
                        onChange={(event) =>
                            setValue('templateStyles.format.dateFormat', event.target.value)
                        }>
                        <MenuItem value="mm/yyyy">mm/yyyy</MenuItem>
                        <MenuItem value="yyyy/mm">yyyy/mm</MenuItem>
                        <MenuItem value="mm-yyyy">mm-yyyy</MenuItem>
                        <MenuItem value="yyyy-mm">yyyy-mm</MenuItem>
                        <MenuItem value="mm.yyyy">mm.yyyy</MenuItem>
                        <MenuItem value="yyyy.mm">yyyy.mm</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormGroup sx={{ paddingY: 1 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={format.isFooterVisible}
                                onChange={(event) =>
                                    setValue(
                                        'templateStyles.format.isFooterVisible',
                                        event.target.checked,
                                    )
                                }
                            />
                        }
                        label="Show footer"
                    />
                </FormGroup>
            </Grid>
        </>
    );
};
