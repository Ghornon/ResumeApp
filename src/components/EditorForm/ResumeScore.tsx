import {
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    Chip,
    LinearProgress,
    Stack,
    Typography,
} from '@mui/material';
import { useResumeStore } from '../../store/ResumeStore';
import { useEffect, useState } from 'react';
import { Accordion } from '../Accordion';
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material';

type hint = {
    variant: 'info' | 'warning' | 'error';
    message: string;
};

const ResumeScore = () => {
    const [score, setScore] = useState(0);
    const [hints, setHints] = useState([] as Array<hint>);
    const [expanded, setExpanded] = useState(false);

    const resume = useResumeStore((state) => state.resume);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const countScore = () => {
        let currentScore = 0;
        const currentHints = [] as Array<hint>;
        let maxScore = 0;

        const { personalDetails, educationHistory, employmentHistory, languages, skills, summary } =
            resume;

        // Profile

        if (personalDetails.firstName.length > 0 && personalDetails.lastName.length > 0)
            currentScore++;
        else
            currentHints.push({
                variant: 'error',
                message: 'Name is mandatory!',
            });

        if (personalDetails.jobTitle.length > 0) currentScore++;
        else
            currentHints.push({
                variant: 'error',
                message: 'Wanted job title is critical!',
            });

        if (
            personalDetails.email.length > 0 &&
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(personalDetails.email)
        )
            currentScore++;
        else
            currentHints.push({
                variant: 'warning',
                message: 'Valid email address is important',
            });

        if (personalDetails.phone.length > 0) currentScore++;
        else
            currentHints.push({
                variant: 'warning',
                message: 'Valid phone number is important',
            });

        if (summary.length > 0 && summary.length < 400) {
            currentScore++;
            currentHints.push({
                variant: 'info',
                message: 'Summary should contain from 400 up to 600 characters',
            });
        } else if (summary.length >= 400 && summary.length < 600) currentScore += 2;
        else
            currentHints.push({
                variant: 'warning',
                message: 'Summary should contain from 400 up to 600 characters',
            });

        maxScore += 6;

        // Employment History

        if (employmentHistory.length > 0 && educationHistory.length > 0) currentScore++;
        else
            currentHints.push({
                variant: 'error',
                message: 'CV has to contain at least one education item or work/internship item',
            });

        maxScore++;

        employmentHistory.forEach((item) => {
            if (item.jobTitle.length > 0) currentScore++;
            else
                currentHints.push({
                    variant: 'warning',
                    message: 'Job title is important!',
                });

            if (item.employer.length > 0) currentScore++;
            else
                currentHints.push({
                    variant: 'warning',
                    message: 'Employer field is important!',
                });

            if (item.startDate.seconds < item.endDate.seconds) currentScore++;
            else
                currentHints.push({
                    variant: 'warning',
                    message: `The start date of employment cannot be later than its completion date (${item.jobTitle})`,
                });

            maxScore += 3;
        });

        // Education History
        educationHistory.forEach((item) => {
            if (item.schoolName.length > 0) currentScore++;
            else
                currentHints.push({
                    variant: 'warning',
                    message: 'School name is important!',
                });

            if (item.startDate.seconds < item.endDate.seconds) currentScore++;
            else
                currentHints.push({
                    variant: 'warning',
                    message: `The start date of education cannot be later than its completion date (${item.schoolName})`,
                });

            maxScore += 2;
        });

        // Skills

        if (skills.length > 3 && skills.length < 6) {
            currentScore++;
            currentHints.push({
                variant: 'info',
                message: 'Its recommended to add 6 or more skills',
            });
        } else if (skills.length >= 6) {
            currentScore += 2;
        } else {
            currentHints.push({
                variant: 'info',
                message: 'Try to add more skills',
            });
        }

        if (languages.length > 0) currentScore++;

        maxScore += 3;

        // Return score and hints

        setScore((currentScore / maxScore) * 100);
        setHints(currentHints);
    };

    const getProgressbarColor = () => {
        if (score < 20) return 'error';
        if (score < 40) return 'warning';
        if (score < 60) return 'info';

        return 'success';
    };

    useEffect(() => {
        countScore();
    }, [resume]);

    return (
        <Box sx={{ marginBottom: 2 }}>
            <Stack direction="row" sx={{ my: 1, justifyContent: 'space-between' }}>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Chip label={`${score.toFixed()}%`} color={getProgressbarColor()} />
                    <Typography variant="subtitle2">Resume score</Typography>
                </Stack>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleExpansion}
                    sx={{ alignSelf: 'right' }}
                    endIcon={
                        expanded ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />
                    }>
                    Show hints
                </Button>
            </Stack>

            <LinearProgress variant="determinate" value={score} color={getProgressbarColor()} />

            <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                sx={{ border: 0, background: 'transparent' }}>
                <AccordionSummary sx={{ display: 'none' }}></AccordionSummary>
                <AccordionDetails sx={{ m: 0, p: 0 }}>
                    {hints.map((hint, index) => (
                        <Alert
                            key={`${hint.variant}-${index}`}
                            severity={hint.variant}
                            sx={{ my: 1 }}
                            onClose={() => {
                                const newHints = [...hints];
                                newHints.splice(index, 1);
                                setHints(newHints);
                            }}>
                            {hint.message}
                        </Alert>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default ResumeScore;
