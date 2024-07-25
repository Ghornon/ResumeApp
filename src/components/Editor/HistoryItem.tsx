import AddIcon from '@mui/icons-material/Add';
import { EducationHistoryItem, EmploymentHistoryItem } from '../../types/Resume.types';
import { useMemo, useState } from 'react';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import { Grid, Typography, Button, TextField, debounce, IconButton, Tooltip } from '@mui/material';
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
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from './Accordion';

export const HistoryItem = ({ type }: { type: string }) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const employmentHistory = useResumeStore((state) => state.employmentHistory);
    const setEmploymentHistory = useResumeStore((state) => state.setEmploymentHistory);
    const educationHistory = useResumeStore((state) => state.educationHistory);
    const setEducationHistory = useResumeStore((state) => state.setEducationHistory);

    const getState = () => {
        if (type == 'employmentHistory') {
            return employmentHistory;
        }

        if (type == 'educationHistory') {
            return educationHistory;
        }

        return [];
    };
    const { resumeId } = useParams();
    const saveDocument = useMemo(
        () => (resumeData: Array<EmploymentHistoryItem | EducationHistoryItem>) => {
            if (resumeId) {
                const resumeRef = doc(db, 'resumes', resumeId);

                console.log('Saving data', resumeId, resumeData);
                if (type == 'employmentHistory') {
                    updateDoc(resumeRef, {
                        employmentHistory: resumeData,
                        timestamp: Timestamp.now(),
                    });
                }

                if (type == 'educationHistory') {
                    updateDoc(resumeRef, {
                        educationHistory: resumeData,
                        timestamp: Timestamp.now(),
                    });
                }
            }
        },
        [resumeId, type],
    );

    const debouncedSaveDocument = useMemo(
        () =>
            debounce(
                (resumeData: Array<EmploymentHistoryItem | EducationHistoryItem>) =>
                    saveDocument(resumeData),
                1000,
            ),
        [saveDocument],
    );

    const setState = (newState: Array<EmploymentHistoryItem | EducationHistoryItem>) => {
        if (type == 'employmentHistory') {
            setEmploymentHistory(newState as Array<EmploymentHistoryItem>);
            debouncedSaveDocument(newState);
        }

        if (type == 'educationHistory') {
            setEducationHistory(newState as Array<EducationHistoryItem>);
            debouncedSaveDocument(newState);
        }
    };

    const handleAccordionChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleHistoryItemChange = <
        T extends
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
            | { target: { name: string; value: Timestamp } },
    >(
        event: T,
    ) => {
        const { name, value } = event.target;
        const path = name.split('.');
        const finalProp = path.pop();
        const index = parseInt(path[0]);

        const newData: Array<EmploymentHistoryItem | EducationHistoryItem> = [...getState()];

        if (!isNaN(index) && finalProp) newData[index][finalProp] = value;

        setState(newData);
    };

    const removeHistoryItem = (index: number) => {
        console.log('Removing item');
        const updatedHistory = getState().filter((_element, i) => i != index);
        setState(updatedHistory);
    };

    const moveHistoryItem = (index: number, toIndex: number) => {
        const updatedHistory = [...getState()];
        const element = updatedHistory.splice(index, 1)[0];

        const pointer = index + toIndex;

        if (pointer >= getState().length || pointer < 0) return;

        updatedHistory.splice(pointer, 0, element);

        setState(updatedHistory);
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

        setState([...getState(), newItem]);

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
                                                            handleHistoryItemChange({
                                                                target: {
                                                                    name: `${index}.${key}`,
                                                                    value: Timestamp.fromDate(
                                                                        new Date(
                                                                            dayjs(
                                                                                newValue,
                                                                            ).toDate(),
                                                                        ),
                                                                    ),
                                                                },
                                                            })
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
                                                onChange={handleHistoryItemChange}
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
