import { Text, Font, Page, View, Document, StyleSheet } from '@react-pdf/renderer';
import Header from './Header';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import { ResumeType } from '../../../types/Resume.types';
import Languages from './Languages';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        width: 1000,
    },
    container: {
        paddingTop: 10,
        flex: 1,
        flexDirection: 'row',
        '@media max-width: 400': {
            flexDirection: 'column',
        },
    },
    image: {
        marginBottom: 10,
    },
    leftColumn: {
        flexDirection: 'column',
        width: 370,
        paddingTop: 10,
        paddingRight: 30,
    },
    rightColumn: {
        width: 170,
        flexDirection: 'column',
        paddingTop: 10,
    },
    footer: {
        fontSize: 8,
        fontFamily: 'Lato',
        textAlign: 'center',
        marginTop: 15,
        paddingTop: 5,
        '@media orientation: landscape': {
            marginTop: 10,
        },
    },
});

Font.register({
    family: 'Open Sans',
    src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
    family: 'Lato',
    src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
    family: 'Lato Italic',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
    family: 'Lato Bold',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const Resume = ({ resumeData }: { resumeData: ResumeType }) => (
    <Page size="A4" style={styles.page}>
        <Header resumeData={resumeData} />
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <Education resumeData={resumeData} />
                <Experience resumeData={resumeData} />
            </View>
            <View style={styles.rightColumn}>
                <Skills resumeData={resumeData} />
                <Languages resumeData={resumeData} />
            </View>
        </View>
        {resumeData.footer.length > 0 ? (
            <Text style={styles.footer}>{resumeData.footer}</Text>
        ) : null}
    </Page>
);

const SimpleTemplate = ({ resumeData }: { resumeData: ResumeType }) => {
    return (
        <Document
            author="Resume APP"
            keywords="simple, resume"
            subject={resumeData.name}
            title={resumeData.name}>
            <Resume resumeData={resumeData} />
        </Document>
    );
};

export default SimpleTemplate;
