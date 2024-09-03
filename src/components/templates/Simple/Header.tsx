import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeType } from '../../../types/Resume.types';

const styles = StyleSheet.create({
    header: {
        paddingBottom: 40,
        position: 'relative',
    },
    container: {
        paddingBottom: 5,
    },
    summaryColumn: {
        flexDirection: 'column',
        flexGrow: 9,
    },
    name: {
        fontSize: 24,
        fontFamily: 'Lato Bold',
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Lato',
    },

    summary: {
        fontFamily: 'Lato',
        fontSize: 10,
    },

    contact: {
        width: '112%',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: -30,
    },
    contactItem: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 12,
        color: 'white',
    },
});

const Header = ({ resumeData }: { resumeData: ResumeType }) => (
    <View style={styles.header}>
        <View style={styles.container}>
            <Text style={styles.name}>
                {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
            </Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.subtitle}>{resumeData.personalDetails.jobTitle}</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.summary}>{resumeData.summary}</Text>
        </View>

        <View style={styles.contact}>
            <Text style={styles.contactItem}>{resumeData.personalDetails.email}</Text>
            <Text style={styles.contactItem}>{resumeData.personalDetails.phone}</Text>
            <Text style={styles.contactItem}>{resumeData.personalDetails.country}</Text>
            <Text style={styles.contactItem}>{resumeData.personalDetails.city}</Text>
        </View>
    </View>
);

export default Header;
