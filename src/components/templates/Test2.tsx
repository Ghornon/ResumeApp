import { Text, Font, Page, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeType } from '../../types/Resume.types';

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

const headerStyles = StyleSheet.create({
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
        <View style={headerStyles.container}>
            <View style={headerStyles.detailColumn}>
                <Text style={headerStyles.name}>
                    {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
                </Text>
                <Text style={headerStyles.subtitle}>{resumeData.personalDetails.jobTitle}</Text>
            </View>
            <View style={headerStyles.linkColumn}>
                <Text>11</Text>
            </View>
        </View>
        <View>
            <Text style={headerStyles.subtitle}>{resumeData.summary}</Text>
        </View>
    </View>
);

const Resume = ({ resumeData }: { resumeData: ResumeType }) => (
    <Page size="A4" style={styles.page}>
        <Header resumeData={resumeData} />
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                {/* <Image src="https://react-pdf.org/static/images/luke.jpg" style={styles.image} /> */}
                <Text>column left</Text>
            </View>
            <Text>column Right</Text>
        </View>
    </Page>
);

const Test2 = ({ resumeData }: { resumeData: ResumeType }) => {
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

export default Test2;
