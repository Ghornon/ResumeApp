import { Box } from '@mui/material';
import { DocumentSnapshot } from 'firebase/firestore';
import {
    Text,
    Font,
    Page,
    View,
    Image,
    Document,
    StyleSheet,
    PDFViewer,
} from '@react-pdf/renderer';
import Header from './templates/example/Header';
import Education from './templates/example/Education';
import Skills from './templates/example/Skills';
import Experience from './templates/example/Experience';

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

const Resume = (props) => (
    <Page {...props} style={styles.page}>
        <Header />
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <Image src="https://react-pdf.org/static/images/luke.jpg" style={styles.image} />
                <Education />
                <Skills />
            </View>
            <Experience />
        </View>
        <Text style={styles.footer}>This IS the candidate you are looking for</Text>
    </Page>
);

const PDFView = ({ resumeSnapshot }: { resumeSnapshot: DocumentSnapshot }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: '1 1 0',
                backgroundColor: 'rgb(101, 110, 131)',
                height: '100vh',
                width: '100%',
                overflow: 'visible',
                position: 'sticky',
                top: 0,
            }}>
            <PDFViewer width={'100%'} showToolbar={false}>
                <Document
                    author="Luke Skywalker"
                    keywords="awesome, resume, start wars"
                    subject="The resume of Luke Skywalker"
                    title="Resume">
                    <Resume size="A4" />
                </Document>
            </PDFViewer>
        </Box>
    );
};

export default PDFView;
