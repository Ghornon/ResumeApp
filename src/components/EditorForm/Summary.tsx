import { Grid, TextField } from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';

const Summary = () => {
    const summary = useResumeStore((state) => state.resume.summary);
    const setValue = useResumeStore((state) => state.setValue);

    return (
        <Grid item xs={12}>
            <TextField
                fullWidth
                id="summary"
                name="summary"
                label="Summary"
                placeholder="Summary"
                value={summary}
                multiline
                onChange={(event) => setValue('summary', event.target.value)}
            />
        </Grid>
    );
};

export default Summary;
