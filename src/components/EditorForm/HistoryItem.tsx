import AddIcon from '@mui/icons-material/Add';
import { EducationHistoryItem, EmploymentHistoryItem } from '../../types/Resume.types';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { Grid, Typography, Button, TextField, IconButton, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { timestampToDate } from '../../helpers/timestampToDate';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useResumeStore } from '../../store/ResumeStore';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '../Accordion';

export const HistoryItem = ({ type }: { type: string }) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const employmentHistory = useResumeStore((state) => state.resume.employmentHistory);
    const educationHistory = useResumeStore((state) => state.resume.educationHistory);
    const setValue = useResumeStore((state) => state.setValue);

    const getState = () => {
        if (type == 'employmentHistory') {
            return employmentHistory;
        }

        if (type == 'educationHistory') {
            return educationHistory;
        }

        return [];
    };

    const handleAccordionChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const removeHistoryItem = (index: number) => {
        console.log('Removing item');
        const updatedHistory = getState().filter((_element, i) => i != index);
        setValue(type, updatedHistory);
    };

    const moveHistoryItem = (index: number, toIndex: number) => {
        const updatedHistory = [...getState()];
        const element = updatedHistory.splice(index, 1)[0];

        const pointer = index + toIndex;

        if (pointer >= getState().length || pointer < 0) return;

        updatedHistory.splice(pointer, 0, element);

        setValue(type, updatedHistory);
        setExpanded(`panel.${pointer}`);
    };

    const addNewHistoryItem = () => {
        let newItem = {} as EmploymentHistoryItem | EducationHistoryItem;

        if (type == 'employmentHistory')
            newItem = {
                companyName: '',
                jobTitle: '',
                employer: '',
                startDate: Timestamp.now(),
                endDate: Timestamp.now(),
                city: '',
                description: '',
            };

        if (type == 'educationHistory')
            newItem = {
                schoolName: '',
                degree: '',
                startDate: Timestamp.now(),
                endDate: Timestamp.now(),
                city: '',
                description: '',
            };

        setValue(type, [...getState(), newItem]);
        setExpanded(`panel.${getState().length}`);
    };

    const historyMap = new Map(
        Object.entries({
            employmentHistory: {
                buttonText: 'Add new employment',
                fields: {
                    jobTitle: 'Job title',
                    employer: 'Employer',
                    startDate: 'Start date',
                    endDate: 'End date',
                    city: 'City',
                    description: 'Description',
                },
            },
            educationHistory: {
                buttonText: 'Add new education',
                fields: {
                    schoolName: 'School name',
                    degree: 'Degree',
                    startDate: 'Start date',
                    endDate: 'End date',
                    city: 'City',
                    description: 'Description',
                },
            },
        }),
    );

    return (
        <Grid item xs={12}>
            {getState().map((historyItem, index) => (
                <Accordion
                    key={`panel.${index}`}
                    expanded={expanded === `panel.${index}`}
                    onChange={handleAccordionChange(`panel.${index}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Typography variant="body1" component="p">
                            {type == 'educationHistory'
                                ? `${historyItem.schoolName}`
                                : `${historyItem.jobTitle} at ${historyItem.employer}`}
                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                paddingX: 2,
                                color: 'text.secondary',
                            }}>
                            {`${timestampToDate(historyItem.startDate)} - ${timestampToDate(historyItem.endDate)}`}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            {Object.entries(historyMap.get(type)?.fields || {}).map(
                                ([key, value]) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={key == 'description' ? 12 : 6}
                                        key={`${index}.${key}`}>
                                        {key == 'startDate' || key == 'endDate' ? (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        views={['month', 'year']}
                                                        label={value}
                                                        name={`${index}.${key}`}
                                                        sx={{ width: '100%' }}
                                                        onChange={(newValue) =>
                                                            setValue(
                                                                `${type}[${index}].${key}`,
                                                                Timestamp.fromDate(
                                                                    new Date(
                                                                        dayjs(newValue).toDate(),
                                                                    ),
                                                                ),
                                                            )
                                                        }
                                                        value={dayjs(
                                                            timestampToDate(historyItem[key]),
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
                                                onChange={(event) =>
                                                    setValue(
                                                        `${type}[${index}].${key}`,
                                                        event.target.value,
                                                    )
                                                }
                                                value={historyItem[key]}
                                                multiline={key == 'description' ? true : false}
                                            />
                                        )}
                                    </Grid>
                                ),
                            )}
                        </Grid>
                    </AccordionDetails>
                    <AccordionActions>
                        <Tooltip title="Remove">
                            <IconButton
                                aria-label="Remove"
                                onClick={() => removeHistoryItem(index)}
                                color="error">
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Move Up">
                            <IconButton
                                aria-label="Move Up"
                                onClick={() => moveHistoryItem(index, -1)}
                                color="primary">
                                <ArrowCircleUpIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Move Down">
                            <IconButton
                                aria-label="Move Down"
                                onClick={() => moveHistoryItem(index, 1)}
                                color="primary">
                                <ArrowCircleDownIcon />
                            </IconButton>
                        </Tooltip>
                    </AccordionActions>
                </Accordion>
            ))}
            <Button
                variant="outlined"
                fullWidth
                sx={{ marginTop: 2 }}
                startIcon={<AddIcon />}
                onClick={addNewHistoryItem}>
                {historyMap.get(type)?.buttonText}
            </Button>
        </Grid>
    );
};
