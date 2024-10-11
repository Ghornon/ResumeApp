import { View, StyleSheet, Text } from '@react-pdf/renderer';

import { ResumeType, SkillItem } from '../../../types/Resume.types';
import getDefaultStyleSheet from '../getDefaultStyleSheet';
import H2 from '../_components/H2';

const SkillEntry = ({ skills }: { skills: SkillItem[] }) => {
    const defaultStyles = getDefaultStyleSheet();

    const styles = StyleSheet.create({
        container: {
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

    return (
        <View style={styles.container}>
            {skills.map((skill, index) => (
                <Text
                    style={{ ...styles.skill, ...defaultStyles.highlightColor }}
                    key={`skill-${index}`}>
                    {skill.skillName}
                </Text>
            ))}
        </View>
    );
};

const Skills = ({ resumeData }: { resumeData: ResumeType }) => {
    return (
        <View>
            <H2>Skills</H2>
            <SkillEntry skills={resumeData.skills} />
        </View>
    );
};

export default Skills;
