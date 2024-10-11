import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { timestampToDate } from '../../../helpers/timestampToDate';
import { ResumeType } from '../../../types/Resume.types';
import H2 from '../_components/H2';
import B from '../_components/B';

const styles = StyleSheet.create({
    description: {
        textAlign: 'justify',
    },
    city: {
        textAlign: 'right',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        paddingVertical: 10,
    },
});

const Education = ({ resumeData }: { resumeData: ResumeType }) => (
    <View style={styles.box}>
        <H2>Education</H2>
        {resumeData.educationHistory.map((education, index) => (
            <View key={`education-${index}`}>
                <B>
                    {education.schoolName} | {education.city}
                </B>
                <View style={styles.container}>
                    <Text>
                        {timestampToDate(education.startDate)} to{' '}
                        {timestampToDate(education.endDate)}
                    </Text>
                    <Text>{education.city}</Text>
                </View>
                {education.degree ? <Text>Degree: {education.degree}</Text> : null}
                <Text style={styles.description}>{education.description}</Text>
            </View>
        ))}
    </View>
);

export default Education;
