import AddIcon from '@mui/icons-material/Add';
import { LanguageItem, languageLevel } from '../../types/Resume.types';
import { useMemo, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Typography,
    Button,
    AccordionActions,
    TextField,
    debounce,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { useResumeStore } from '../../store/ResumeStore';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';

export const Languages = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const languages = useResumeStore((state) => state.languages);
    const setLanguage = useResumeStore((state) => state.setLanguages);

    const { resumeId } = useParams();
    const saveDocument = useMemo(
        () => (resumeData: Array<LanguageItem>) => {
            if (resumeId) {
                const resumeRef = doc(db, 'resumes', resumeId);

                console.log('Saving data', resumeId, resumeData);

                updateDoc(resumeRef, { languages: resumeData });
            }
        },
        [resumeId],
    );

    const debouncedSaveDocument = useMemo(
        () => debounce((resumeData: Array<LanguageItem>) => saveDocument(resumeData), 1000),
        [saveDocument],
    );

    const handleAccordionChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
    ) => {
        const { name, value } = event.target;
        const path = name.split('.');
        const finalProp = path.pop();
        const index = parseInt(path[0]);
        const newData: Array<LanguageItem> = [...languages];

        if (!isNaN(index) && finalProp)
            if (finalProp == 'level') newData[index][finalProp] = value as languageLevel;
            else if (finalProp == 'language') newData[index][finalProp] = value;

        setLanguage(newData);
        debouncedSaveDocument(newData);
    };

    const removeLanguage = (index: number) => {
        console.log('Removing item');
        const updatedHistory = languages.filter((_element, i) => i != index);
        setLanguage(updatedHistory as Array<LanguageItem>);
        debouncedSaveDocument(updatedHistory);
    };

    const moveLanguage = (index: number, toIndex: number) => {
        const updatedHistory = [...languages];
        const element = updatedHistory.splice(index, 1)[0];

        const pointer = index + toIndex;

        if (pointer >= languages.length || pointer < 0) return;

        updatedHistory.splice(pointer, 0, element);

        setLanguage(updatedHistory as Array<LanguageItem>);
        debouncedSaveDocument(updatedHistory);
    };

    const addNewLanguage = () => {
        const newItem = { language: '', level: languageLevel.A1 } as LanguageItem;

        setLanguage([...languages, newItem]);
        debouncedSaveDocument([...languages, newItem]);
        setExpanded(`panel.${languages.length}`);
    };

    return (
        <Grid item xs={12}>
            {languages.map((language, index) => (
                <Accordion
                    key={`panel.${index}`}
                    expanded={expanded === `panel.${index}`}
                    onChange={handleAccordionChange(`panel.${index}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Typography variant="body1" component="p">
                            {language.language || 'Language'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Language"
                                    id={`${index}.language`}
                                    name={`${index}.language`}
                                    onChange={handleChange}
                                    value={language.language}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id={`${index}.languageLevel`}>Level</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId={`${index}.languageLevel`}
                                        id={`${index}.level`}
                                        name={`${index}.level`}
                                        value={language.level.toString()}
                                        label="Template"
                                        onChange={handleChange}>
                                        {Object.keys(languageLevel).map((key) => (
                                            <MenuItem value={key} key={key}>
                                                {languageLevel[key as keyof typeof languageLevel]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    <AccordionActions>
                        <Button
                            startIcon={<DeleteOutlineIcon />}
                            onClick={() => removeLanguage(index)}
                            color="error">
                            Remove
                        </Button>
                        <Button
                            startIcon={<ArrowCircleUpIcon />}
                            onClick={() => moveLanguage(index, -1)}>
                            Move Up
                        </Button>
                        <Button
                            startIcon={<ArrowCircleDownIcon />}
                            onClick={() => moveLanguage(index, 1)}>
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
                onClick={addNewLanguage}>
                Add new language
            </Button>
        </Grid>
    );
};
