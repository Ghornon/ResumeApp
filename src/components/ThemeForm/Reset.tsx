import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';
import { getTemplateStylesDoc } from '../../helpers/getTemplateStylesDoc';

export const Reset = () => {
    const templateId = useResumeStore((state) => state.resume.templateId);
    const setValue = useResumeStore((state) => state.setValue);

    const handleReset = async () => {
        const templateStyles = await getTemplateStylesDoc(templateId);

        setValue('templateStyles', useResumeStore.getInitialState().resume.templateStyles);

        Object.keys(templateStyles).map((property) => {
            setValue(`templateStyles.${property}`, templateStyles[property]);
        });
    };

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
                        onClick={handleReset}>
                        Reset
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};
