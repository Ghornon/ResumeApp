import { Font, StyleSheet } from '@react-pdf/renderer';
import { useResumeStore } from '../../store/ResumeStore';

/* 
  Special: ['Ubuntu', 'Raleway', 'Roboto', 'Hind', 'Lato'],
        'Sans Serif': ['Arial', 'Calibri', 'Helvetica', 'Trebuchet MS'],
        Serif: ['Cambria', 'Georgia', 'Garamond', 'Book Antiqua', 'Times New Roman'],
*/

/* Special fonts */
Font.register({
    family: 'Ubuntu',
    src: 'http://fonts.gstatic.com/s/ubuntu/v9/2Q-AW1e_taO6pHwMXcXW5w.ttf',
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

const getDefaultStyleSheet = () => {
    const styles = useResumeStore.getState().resume.templateStyles;

    const newStyleSheet = StyleSheet.create({
        page: {
            padding: 30,
            fontFamily: styles.font.fontName,
            lineHeight: styles.font.lineSpacing,
            fontSize: styles.font.fontSize,
            color: styles.colors.fontColor,
            backgroundColor: styles.colors.bgColor,
        },
        highlightColor: {
            backgroundColor: styles.colors.highlightColor,
        },
        title: {
            fontWeight: 'bold',
            fontSize: styles.font.fontSize * 3,
            textTransform: styles.font.headlineCapitalization,
        },
        h1: {
            fontWeight: 'bold',
            fontSize: styles.font.fontSize * 2,
            textTransform: styles.font.headlineCapitalization,
        },
        h2: {
            fontWeight: 'bold',
            fontSize: styles.font.fontSize * 1.75,
            textTransform: styles.font.headlineCapitalization,
        },
        h3: {
            fontWeight: 'bold',
            fontSize: styles.font.fontSize * 1.5,
            textTransform: styles.font.headlineCapitalization,
        },
        p: {
            padding: 5,
        },
        b: {
            fontWeight: 'black',
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
            display: styles.format.isFooterVisible ? 'flex' : 'none',
            fontSize: styles.font.fontSize - 2,
        },
    });

    return newStyleSheet;
};

export default getDefaultStyleSheet;
