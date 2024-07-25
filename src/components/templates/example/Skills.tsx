import { View } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';
import { ResumeType, SkillItem } from '../../../types/Resume.types';

const SkillEntry = ({ skills }: { skills: SkillItem[] }) => (
    <View>
        <List>
            {skills.map((skill, index) => (
                <Item key={`skill-${index}`}>{skill.skillName}</Item>
            ))}
        </List>
    </View>
);

const Skills = ({ resumeData }: { resumeData: ResumeType }) => (
    <View>
        <Title>Skills</Title>
        <SkillEntry skills={resumeData.skills} />
    </View>
);

export default Skills;
