import { Font, StyleSheet } from '@react-pdf/renderer';
import { ResumeType } from '../../types/Resume.types';

/* 
  Special: ['Ubuntu', 'Raleway', 'Roboto', 'Hind', 'Lato'],
        'Sans Serif': ['Arial', 'Calibri', 'Helvetica', 'Trebuchet MS'],
        Serif: ['Cambria', 'Georgia', 'Garamond', 'Book Antiqua', 'Times New Roman'],
*/

/* Special fonts */
Font.register({
    family: 'Ubuntu',
    fonts: [
        {
            src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
        },
        {
            src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
            fontWeight: 'bold',
        },
        {
            src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
            fontWeight: 'normal',
            fontStyle: 'italic',
        },
    ],
});

Font.register({
    family: 'Raleway',
    src: 'http://fonts.gstatic.com/s/raleway/v11/bIcY3_3JNqUVRAQQRNVteQ.ttf',
});
Font.register({
    family: 'Roboto',
    src: 'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf',
});
Font.register({
    family: 'Hind',
    src: 'http://fonts.gstatic.com/s/hind/v6/nz5dxQAyXAGLFHmmJlZXFg.ttf',
});

Font.register({
    family: 'Lato',
    src: 'http://fonts.gstatic.com/s/lato/v13/v0SdcGFAl2aezM9Vq_aFTQ.ttf',
});

/* Emoji */
Font.registerEmojiSource({
    format: 'png',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

const getTemplateStyleSheet = (resumeData: ResumeType) => {
    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontFamily: resumeData.templateStyles.font.fontName,
            lineHeight: resumeData.templateStyles.font.lineSpacing,
            fontSize: resumeData.templateStyles.font.fontSize,
            color: resumeData.templateStyles.colors.fontColor,
            backgroundColor: resumeData.templateStyles.colors.bgColor,
        },
        header: {},
        highlightColor: {
            backgroundColor: resumeData.templateStyles.colors.highlightColor,
        },
        name: {
            fontWeight: 'bold',
            fontSize: resumeData.templateStyles.font.fontSize * 3,
            textTransform: resumeData.templateStyles.font.headlineCapitalization,
        },
        h1: {
            fontWeight: 'bold',
            fontSize: resumeData.templateStyles.font.fontSize * 2,
            textTransform: resumeData.templateStyles.font.headlineCapitalization,
        },
        h2: {
            fontWeight: 'bold',
            fontSize: resumeData.templateStyles.font.fontSize * 1.75,
            textTransform: resumeData.templateStyles.font.headlineCapitalization,
        },
        h3: {
            fontWeight: 'bold',
            fontSize: resumeData.templateStyles.font.fontSize * 1.5,
            textTransform: resumeData.templateStyles.font.headlineCapitalization,
        },
        container: {
            paddingTop: 10,
            width: '100%',
            flex: 1,
            flexDirection: 'row',
        },
        leftColumn: {
            flexDirection: 'column',
            width: '70%',
            paddingTop: 10,
            paddingRight: 30,
        },
        rightColumn: {
            width: '30%',
            flexDirection: 'column',
            paddingTop: 10,
        },
        footer: {
            textAlign: 'center',
            display: resumeData.templateStyles.format.isFooterVisible ? 'flex' : 'none',
            fontSize: resumeData.templateStyles.font.fontSize - 2,
        },
    });

    return styles;
};

export default getTemplateStyleSheet;
