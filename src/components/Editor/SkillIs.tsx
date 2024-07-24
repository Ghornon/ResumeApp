import AddIcon from '@mui/icons-material/Add';
import { SkillItem } from '../../types/Resume.types';
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

export const Skills = () => {
    console.log('Rebuilding Skills');
    const [expanded, setExpanded] = useState<string | false>(false);

    const skills = useResumeStore((state) => state.skills);
    const setSkills = useResumeStore((state) => state.setSkills);

    const { resumeId } = useParams();
    const saveDocument = useMemo(
        () => (resumeData: Array<SkillItem>) => {
            if (resumeId) {
                const resumeRef = doc(db, 'resumes', resumeId);

                console.log('Saving data', resumeId, resumeData);

                updateDoc(resumeRef, { skills: resumeData });
            }
        },
        [resumeId],
    );

    const debouncedSaveDocument = useMemo(
        () => debounce((resumeData: Array<SkillItem>) => saveDocument(resumeData), 1000),
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

        console.log(index, finalProp);

        const newData: Array<SkillItem> = [...skills];

        if (!isNaN(index) && finalProp) newData[index][finalProp] = value;

        setSkills(newData);
        debouncedSaveDocument(newData);
    };

    const removeSkill = (index: number) => {
        console.log('Removing item');
        const updatedHistory = skills.filter((_element, i) => i != index);
        setSkills(updatedHistory as Array<SkillItem>);
        debouncedSaveDocument(updatedHistory);
    };

    const moveSkill = (index: number, toIndex: number) => {
        const updatedHistory = [...skills];
        const element = updatedHistory.splice(index, 1)[0];

        const pointer = index + toIndex;

        if (pointer >= skills.length || pointer < 0) return;

        updatedHistory.splice(pointer, 0, element);

        setSkills(updatedHistory as Array<SkillItem>);
        debouncedSaveDocument(updatedHistory);
    };

    const addNewSkill = () => {
        const newItem = { skillName: '', level: 5 } as SkillItem;

        setSkills([...skills, newItem]);
        debouncedSaveDocument([...skills, newItem]);
        setExpanded(`panel.${skills.length}`);
    };

    return (
        <Grid item xs={12}>
            {skills.map((skill, index) => (
                <Accordion
                    key={`panel.${index}`}
                    expanded={expanded === `panel.${index}`}
                    onChange={handleAccordionChange(`panel.${index}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Typography variant="body1" component="p">
                            {skill.skillName || 'Skill name'}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Skill name"
                                    id={`${index}.skillName`}
                                    name={`${index}.skillName`}
                                    onChange={handleChange}
                                    value={skill.skillName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id={`${index}.skillLevel`}>Level</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId={`${index}.skillLevel`}
                                        id={`${index}.level`}
                                        name={`${index}.level`}
                                        value={skill.level.toString()}
                                        label="Template"
                                        onChange={handleChange}>
                                        <MenuItem value="1">Novice</MenuItem>
                                        <MenuItem value="2">Beginner</MenuItem>
                                        <MenuItem value="3">Skillful</MenuItem>
                                        <MenuItem value="4">Experienced</MenuItem>
                                        <MenuItem value="5">Expert</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    <AccordionActions>
                        <Button
                            startIcon={<DeleteOutlineIcon />}
                            onClick={() => removeSkill(index)}
                            color="error">
                            Remove
                        </Button>
                        <Button
                            startIcon={<ArrowCircleUpIcon />}
                            onClick={() => moveSkill(index, -1)}>
                            Move Up
                        </Button>
                        <Button
                            startIcon={<ArrowCircleDownIcon />}
                            onClick={() => moveSkill(index, 1)}>
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
                onClick={addNewSkill}>
                Add new skill
            </Button>
        </Grid>
    );
};
