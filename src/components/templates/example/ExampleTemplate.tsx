import { Text, Font, Page, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import Header from './Header';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import { ResumeType } from '../../../types/Resume.types';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        width: 1000,
    },
    container: {
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
        width: 170,
        paddingTop: 30,
        paddingRight: 15,
        '@media max-width: 400': {
            width: '100%',
            paddingRight: 0,
        },
        '@media orientation: landscape': {
            width: 200,
        },
    },
    footer: {
        fontSize: 12,
        fontFamily: 'Lato Bold',
        textAlign: 'center',
        marginTop: 15,
        paddingTop: 5,
        borderWidth: 3,
        borderColor: 'gray',
        borderStyle: 'dashed',
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
                {/* <Image src="https://react-pdf.org/static/images/luke.jpg" style={styles.image} /> */}
                <Education />
                <Skills />
            </View>
            <Experience resumeData={resumeData} />
        </View>
        <Text style={styles.footer}>This IS the candidate you are looking for</Text>
    </Page>
);

const ExampleTemplate = ({ resumeData }: { resumeData: ResumeType }) => {
    return (
        <Document
            author="Resume APP"
            keywords="awesome, resume"
            subject={resumeData.name}
            title={resumeData.name}>
            <Resume resumeData={resumeData} />
        </Document>
    );
};

export default ExampleTemplate;
