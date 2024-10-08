import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { timestampToDate } from '../../../helpers/timestampToDate';
import { ResumeType } from '../../../types/Resume.types';
import H2 from '../_components/H2';
import B from '../_components/P';
import P from '../_components/P copy';

const styles = StyleSheet.create({
    container: {},
    degree: {
        textAlign: 'justify',
    },
    candidate: {},
});

const Education = ({ resumeData }: { resumeData: ResumeType }) => (
    <View style={styles.container}>
        <H2>Education</H2>
        {resumeData.educationHistory.map((education, index) => (
            <View key={`education-${index}`}>
                <B>
                    {education.schoolName} | {education.city}
                </B>
                <B>Degree: {education.degree}</B>
                <B>
                    {timestampToDate(education.startDate)} to {timestampToDate(education.endDate)}
                </B>
                <Text style={styles.degree}>{education.description}</Text>
            </View>
        ))}
    </View>
);

export default Education;
