import { Grid, TextField } from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';

const Footer = () => {
    const footer = useResumeStore((state) => state.resume.footer);
    const setValue = useResumeStore((state) => state.setValue);

    return (
        <Grid item xs={12}>
            <TextField
                fullWidth
                id="footer"
                name="footer"
                label="Footer"
                placeholder="Footer"
                value={footer}
                multiline
                onChange={(event) => setValue('footer', event.target.value)}
            />
        </Grid>
    );
};

export default Footer;
