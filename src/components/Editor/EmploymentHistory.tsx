import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    AccordionActions,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { EmploymentHistoryItem, ResumeType } from '../../types/Resume.types';
import { useEffect, useState } from 'react';
import { timestampToDate } from '../../helpers/timestampToDate';
import { Spinner } from '../Spinner';
import { Timestamp } from 'firebase/firestore';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export const EmploymentHistory = ({
    resumeData,
    handleFormChange,
}: {
    resumeData: ResumeType;
    handleFormChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [employmentHistory, setEmploymentHistory] = useState([] as Array<EmploymentHistoryItem>);

    const handleAccordionChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    useEffect(() => {
        setEmploymentHistory([...resumeData.employmentHistory]);
    }, [resumeData.employmentHistory]);

    const handleEmploymentHistoryChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
        const { name, value } = event.target;
        const path = name.split('.');
        const finalProp = path.pop();
        const index = parseInt(path[0]);

        const newData: EmploymentHistoryItem[] = [...employmentHistory];

        console.log(name, value);

        if (!isNaN(index) && finalProp) newData[index][finalProp] = value;

        setEmploymentHistory(newData);

        handleFormChange({ target: { name: 'employmentHistory', value: JSON.stringify(newData) } });
    };

    const removeHistoryItem = (index: number) => {
        console.log('Removing item');
        const updatedEmploymentHistory = employmentHistory.filter((element, i) => i != index);
        setEmploymentHistory(updatedEmploymentHistory);
        handleFormChange({
            target: { name: 'employmentHistory', value: JSON.stringify(updatedEmploymentHistory) },
        });
    };

    const moveHistoryItem = (index: number, toIndex: number) => {
        const updatedEmploymentHistory = [...employmentHistory];
        const element = updatedEmploymentHistory.splice(index, 1)[0];

        const pointer = index + toIndex;

        if (pointer >= employmentHistory.length || pointer < 0) return;

        updatedEmploymentHistory.splice(pointer, 0, element);

        setEmploymentHistory(updatedEmploymentHistory);
        handleFormChange({
            target: { name: 'employmentHistory', value: JSON.stringify(updatedEmploymentHistory) },
        });
    };

    const addNewEmployment = () => {
        const newEmployment = {
            companyName: '',
            jobTitle: '',
            employer: '',
            startDate: Timestamp.now(),
            endDate: Timestamp.now(),
            city: '',
            description: '',
        };

        setEmploymentHistory([...employmentHistory, newEmployment]);
    };

    const employmentHistoryFields = {
        jobTitle: 'Job title',
        employer: 'Employer',
        startDate: 'Start date',
        endDate: 'End date',
        city: 'City',
        description: 'Description',
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                paddingX: 10,
                paddingY: 2,
            }}>
            <Typography variant="h4" component="h4">
                Employment History
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {employmentHistory.map((employmentHistoryItem, index) => (
                        <Accordion
                            key={`panel.${index}`}
                            expanded={expanded === `panel.${index}`}
                            onChange={handleAccordionChange(`panel.${index}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header">
                                <Typography variant="body1" component="p">
                                    {`${employmentHistoryItem.jobTitle} at ${employmentHistoryItem.employer}`}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{
                                        paddingX: 2,
                                        color: 'text.secondary',
                                    }}>
                                    {`${timestampToDate(employmentHistoryItem.startDate)} - ${timestampToDate(employmentHistoryItem.endDate)}`}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    {Object.entries(employmentHistoryFields).map(([key, value]) => (
                                        <Grid item xs={12} sm={6} key={`${index}.${key}`}>
                                            {key == 'startDate' || key == 'endDate' ? (
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DatePicker']}>
                                                        <DatePicker
                                                            label={value}
                                                            name={`${index}.${key}`}
                                                            onChange={(newValue) =>
                                                                handleEmploymentHistoryChange({
                                                                    target: {
                                                                        name: `${index}.${key}`,
                                                                        value: Timestamp.fromDate(
                                                                            new Date(newValue),
                                                                        ),
                                                                    },
                                                                })
                                                            }
                                                            value={dayjs(
                                                                timestampToDate(
                                                                    employmentHistoryItem[key],
                                                                ),
                                                            )}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            ) : (
                                                <TextField
                                                    fullWidth
                                                    label={value}
                                                    id={`${index}.${key}`}
                                                    name={`${index}.${key}`}
                                                    onChange={handleEmploymentHistoryChange}
                                                    value={employmentHistoryItem[key]}
                                                />
                                            )}
                                        </Grid>
                                    ))}
                                </Grid>
                            </AccordionDetails>
                            <AccordionActions>
                                <Button
                                    startIcon={<DeleteOutlineIcon />}
                                    onClick={() => removeHistoryItem(index)}
                                    color="error">
                                    Remove
                                </Button>
                                <Button
                                    startIcon={<ArrowCircleUpIcon />}
                                    onClick={() => moveHistoryItem(index, -1)}>
                                    Move Up
                                </Button>
                                <Button
                                    startIcon={<ArrowCircleDownIcon />}
                                    onClick={() => moveHistoryItem(index, 1)}>
                                    Move Down
                                </Button>
                            </AccordionActions>
                        </Accordion>
                    ))}
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        startIcon={<AddIcon />}
                        onClick={addNewEmployment}>
                        Add new employment
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
