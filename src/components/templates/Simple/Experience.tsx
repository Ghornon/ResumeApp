import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { Timestamp } from 'firebase/firestore';
import { timestampToDateString } from '../../../helpers/timestampToDate';
import { ResumeType } from '../../../types/Resume.types';
import H2 from '../_components/H2';
import B from '../_components/B';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    box: {
        paddingVertical: 10,
    },
    description: {
        textAlign: 'justify',
    },
});

const ExperienceEntry = ({
    jobTitle,
    employer,
    startDate,
    endDate,
    city,
    description,
    dateFormat,
}: {
    jobTitle: string;
    employer: string;
    startDate: Timestamp;
    endDate: Timestamp;
    city: string;
    description: string;
    dateFormat: string;
}) => {
    return (
        <View style={styles.box}>
            <B>{jobTitle}</B>
            <B>{employer}</B>

            <View style={styles.container}>
                <Text>
                    {timestampToDateString(startDate, dateFormat)}
                    {' - '}
                    {timestampToDateString(endDate, dateFormat)}
                </Text>

                <Text>{city}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const Experience = ({ resumeData }: { resumeData: ResumeType }) => (
    <View>
        <H2>Experience</H2>
        {resumeData.employmentHistory.map(
            ({ jobTitle, employer, startDate, endDate, city, description }, index) => (
                <ExperienceEntry
                    key={`experience${index}`}
                    jobTitle={jobTitle}
                    employer={employer}
                    startDate={startDate}
                    endDate={endDate}
                    city={city}
                    description={description}
                    dateFormat={resumeData.templateStyles.format.dateFormat}
                />
            ),
        )}
    </View>
);

export default Experience;
