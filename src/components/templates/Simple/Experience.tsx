import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';
import { Timestamp } from 'firebase/firestore';
import { timestampToDate } from '../../../helpers/timestampToDate';
import { ResumeType } from '../../../types/Resume.types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    entryContainer: {
        marginBottom: 10,
    },
    date: {
        fontSize: 11,
        fontFamily: 'Lato Italic',
    },
    detailLeftColumn: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
    detailRightColumn: {
        flexDirection: 'column',
        flexGrow: 9,
    },
    bulletPoint: {
        fontSize: 10,
    },
    details: {
        fontSize: 10,
        fontFamily: 'Lato',
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    leftColumn: {
        flexDirection: 'column',
        flexGrow: 9,
    },
    rightColumn: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'flex-end',
        justifySelf: 'flex-end',
    },
    title: {
        fontSize: 11,
        color: 'black',
        textDecoration: 'none',
        fontFamily: 'Lato Bold',
    },
});

const ExperienceEntry = ({
    jobTitle,
    employer,
    startDate,
    endDate,
    city,
    description,
}: {
    jobTitle: string;
    employer: string;
    startDate: Timestamp;
    endDate: Timestamp;
    city: string;
    description: string;
}) => {
    const title = `${employer} | ${jobTitle}`;
    return (
        <View style={styles.entryContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.leftColumn}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.date}>
                        {timestampToDate(startDate)} to {timestampToDate(endDate)}
                    </Text>
                </View>
            </View>
            <View style={styles.headerContainer}>
                <View style={styles.rightColumn}>
                    <Text style={styles.date}>{city}</Text>
                </View>
            </View>
            <Text style={styles.details}>{description}</Text>
        </View>
    );
};

const Experience = ({ resumeData }: { resumeData: ResumeType }) => (
    <View style={styles.container}>
        <Title>Experience</Title>
        {resumeData.employmentHistory.map(
            ({ jobTitle, employer, startDate, endDate, city, description }, index) => (
                <ExperienceEntry
                    key={`expierience${index}`}
                    jobTitle={jobTitle}
                    employer={employer}
                    startDate={startDate}
                    endDate={endDate}
                    city={city}
                    description={description}
                />
            ),
        )}
    </View>
);

export default Experience;
