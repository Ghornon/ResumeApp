import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box
            id="faq"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}>
            <Typography
                component="h2"
                variant="h4"
                sx={{
                    color: 'text.primary',
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}>
                Frequently asked questions
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1d-content"
                        id="panel1d-header">
                        <Typography component="h3" variant="subtitle2">
                            What is a resume builder?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                            A resume builder is an online tool designed to help you create a
                            professional resume quickly and easily. It guides you through the
                            process with templates and prompts, ensuring your resume is polished and
                            ready for employers.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2d-content"
                        id="panel2d-header">
                        <Typography component="h3" variant="subtitle2">
                            Why is a resume builder better than a resume template doc?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                            A resume builder is more dynamic than a static template doc. It offers
                            real-time editing, formatting options, and tailored suggestions, which
                            saves you time and ensures your resume stands out.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3d-content"
                        id="panel3d-header">
                        <Typography component="h3" variant="subtitle2">
                            What is unique about our resume builder?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                            Our resume builder stands out by offering personalized suggestions based
                            on your industry and experience, ensuring your resume is not just
                            generic but specifically tailored to highlight your unique strengths.
                            Plus, its user-friendly interface makes the process seamless and
                            stress-free.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
}
