import AddIcon from '@mui/icons-material/Add';
import { SkillItem } from '../../types/Resume.types';
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
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '../Accordion';

export const Skills = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const skills = useResumeStore((state) => state.resume.skills);
    const setValue = useResumeStore((state) => state.setValue);

    const handleAccordionChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const removeSkill = (index: number) => {
        console.log('Removing item');
        const updatedSkills = skills.filter((_element, i) => i != index);
        setValue('skills', updatedSkills);
    };

    const moveSkill = (index: number, toIndex: number) => {
        const updatedSkills = [...skills];
        const element = updatedSkills.splice(index, 1)[0];

        const pointer = index + toIndex;

        if (pointer >= skills.length || pointer < 0) return;

        updatedSkills.splice(pointer, 0, element);

        setValue('skills', updatedSkills);

        setExpanded(`panel.${pointer}`);
    };

    const addNewSkill = () => {
        const newItem = { skillName: '', level: 5 } as SkillItem;

        setValue('skills', [...skills, newItem]);
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
                                    onChange={(event) =>
                                        setValue(`skills[${index}.skillName]`, event.target.value)
                                    }
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
                                        label="Level"
                                        onChange={(event) =>
                                            setValue(`skills[${index}.level]`, event.target.value)
                                        }>
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
                        <Tooltip title="Remove">
                            <IconButton
                                aria-label="Remove"
                                onClick={() => removeSkill(index)}
                                color="error">
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Move Up">
                            <IconButton
                                aria-label="Move Up"
                                onClick={() => moveSkill(index, -1)}
                                color="primary">
                                <ArrowCircleUpIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Move Down">
                            <IconButton
                                aria-label="Move Down"
                                onClick={() => moveSkill(index, 1)}
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
                onClick={addNewSkill}>
                Add new skill
            </Button>
        </Grid>
    );
};
