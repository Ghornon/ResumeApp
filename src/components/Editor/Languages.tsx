import AddIcon from '@mui/icons-material/Add';
import { LanguageItem, languageLevel } from '../../types/Resume.types';
import { useState } from 'react';
import {
    Grid,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { useResumeStore } from '../../store/ResumeStore';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from './Accordion';

export const Languages = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const languages = useResumeStore((state) => state.resume.languages);
    const setValue = useResumeStore((state) => state.setValue);

    const handleAccordionChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const removeLanguage = (index: number) => {
        console.log('Removing item');
        const updatedLanguages = languages.filter((_element, i) => i != index);
        setValue('languages', updatedLanguages);
    };

    const moveLanguage = (index: number, toIndex: number) => {
        const updatedLanguages = [...languages];
        const element = updatedLanguages.splice(index, 1)[0];

        const pointer = index + toIndex;

        if (pointer >= languages.length || pointer < 0) return;

        updatedLanguages.splice(pointer, 0, element);

        setValue('languages', updatedLanguages);

        setExpanded(`panel.${pointer}`);
    };

    const addNewLanguage = () => {
        const newItem = { language: '', level: languageLevel.A1 } as LanguageItem;

        setValue('languages', [...languages, newItem]);
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
                                    onChange={(event) =>
                                        setValue(`languages[${index}].language`, event.target.value)
                                    }
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
                                        onChange={(event) =>
                                            setValue(
                                                `languages[${index}].level`,
                                                event.target.value,
                                            )
                                        }>
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
                        <Tooltip title="Remove">
                            <IconButton
                                aria-label="Remove"
                                onClick={() => removeLanguage(index)}
                                color="error">
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Move Up">
                            <IconButton
                                aria-label="Move Up"
                                onClick={() => moveLanguage(index, -1)}
                                color="primary">
                                <ArrowCircleUpIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Move Down">
                            <IconButton
                                aria-label="Move Down"
                                onClick={() => moveLanguage(index, 1)}
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
                onClick={addNewLanguage}>
                Add new language
            </Button>
        </Grid>
    );
};
