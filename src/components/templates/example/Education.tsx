import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';
import { timestampToDate } from '../../../helpers/timestampToDate';
import { ResumeType } from '../../../types/Resume.types';

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    school: {
        fontFamily: 'Lato Bold',
        fontSize: 10,
    },
    degree: {
        fontFamily: 'Lato',
        fontSize: 10,
        textAlign: 'justify',
    },
    candidate: {
        fontFamily: 'Lato Italic',
        fontSize: 10,
    },
});

const Education = ({ resumeData }: { resumeData: ResumeType }) => (
    <View style={styles.container}>
        <Title>Education</Title>
        {resumeData.educationHistory.map((education, index) => (
            <View key={`education-${index}`}>
                <Text style={styles.school}>
                    {education.schoolName} | {education.city}
                </Text>
                <Text style={styles.degree}>Degree: {education.degree}</Text>
                <Text style={styles.candidate}>
                    {timestampToDate(education.startDate)} to {timestampToDate(education.endDate)}
                </Text>
                <Text style={styles.degree}>{education.description}</Text>
            </View>
        ))}
    </View>
);

export default Education;
