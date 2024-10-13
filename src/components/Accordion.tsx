import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionActions from '@mui/material/AccordionActions';
import { styled } from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:first-of-type)': {
        borderTop: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.primary.contrastText,
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    borderTop: `1px solid ${theme.palette.divider}`,
}));

const AccordionActions = styled(MuiAccordionActions)(({ theme }) => ({
    width: '100%',
    margin: 0,
    paddingTop: 0,
    paddingBottom: theme.spacing(2),
}));

export { Accordion, AccordionActions, AccordionSummary, AccordionDetails };
