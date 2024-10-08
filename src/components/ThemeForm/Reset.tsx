import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';

export const Reset = () => {
    const setValue = useResumeStore((state) => state.setValue);

    return (
        <Grid item xs={12} sm={12}>
            <Card variant="outlined" sx={{ textAlign: 'center' }}>
                <CardContent sx={{ paddingBottom: 0 }}>
                    <Typography>Reset Styles</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Performing this action will reset the styles to their default values
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{ margin: '0 auto' }}
                        onClick={() =>
                            setValue(
                                'templateStyles',
                                useResumeStore.getInitialState().resume.templateStyles,
                            )
                        }>
                        Reset
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};
