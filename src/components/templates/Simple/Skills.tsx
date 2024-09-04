import { View, StyleSheet, Text } from '@react-pdf/renderer';

import Title from './Title';
import { ResumeType, SkillItem } from '../../../types/Resume.types';

const styles = StyleSheet.create({
    container: {
        width: 170,
        gap: 5,
        paddingBottom: 10,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    skill: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 11,
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'Lato Bold',
        borderRadius: 5,
    },
});

const SkillEntry = ({ skills }: { skills: SkillItem[] }) => (
    <View style={styles.container}>
        {skills.map((skill, index) => (
            <Text style={styles.skill} key={`skill-${index}`}>
                <Text>{skill.skillName}</Text>
            </Text>
        ))}
        asd
    </View>
);

const Skills = ({ resumeData }: { resumeData: ResumeType }) => (
    <View>
        <Title>Skills</Title>
        <SkillEntry skills={resumeData.skills} />
    </View>
);

export default Skills;
