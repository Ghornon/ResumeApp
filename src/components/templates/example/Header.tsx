import { Link, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeType } from '../../../types/Resume.types';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#112131',
        borderBottomStyle: 'solid',
        alignItems: 'stretch',
    },
    detailColumn: {
        flexDirection: 'column',
        flexGrow: 9,
        textTransform: 'uppercase',
    },
    linkColumn: {
        flexDirection: 'column',
        flexGrow: 2,
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
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
        fontSize: 10,
        justifySelf: 'flex-end',
        textAlign: 'justify',
        fontFamily: 'Lato',
    },
    link: {
        fontFamily: 'Lato',
        fontSize: 10,
        color: 'black',
        textDecoration: 'none',
        alignSelf: 'flex-end',
        justifySelf: 'flex-end',
    },
});

const Header = ({ resumeData }: { resumeData: ResumeType }) => (
    <View>
        <View style={styles.container}>
            <View style={styles.detailColumn}>
                <Text style={styles.name}>
                    {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
                </Text>
                <Text style={styles.subtitle}>{resumeData.personalDetails.jobTitle}</Text>
            </View>
            <View style={styles.linkColumn}>
                <Link href={`mailto:${resumeData.personalDetails.jobTitle}`} style={styles.link}>
                    {resumeData.personalDetails.email}
                </Link>
            </View>
        </View>
        <View>
            <Text style={styles.subtitle}>{resumeData.summary}</Text>
        </View>
    </View>
);

export default Header;
