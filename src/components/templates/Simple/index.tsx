import { Text, Page, View, Document } from '@react-pdf/renderer';
import Header from './Header';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import { ResumeType } from '../../../types/Resume.types';
import Languages from './Languages';
import getDefaultStyleSheet from '../getDefaultStyleSheet';

const Resume = ({ resumeData }: { resumeData: ResumeType }) => {
    const styles = getDefaultStyleSheet();

    return (
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
            {resumeData.templateStyles.format.isFooterVisible ? (
                <Text style={styles.footer}>{resumeData.footer}</Text>
            ) : null}
        </Page>
    );
};

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
