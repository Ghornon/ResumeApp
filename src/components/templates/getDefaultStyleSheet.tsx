import { Font, StyleSheet } from '@react-pdf/renderer';
import { useResumeStore } from '../../store/ResumeStore';

export const FONTS = {
    Special: {
        Ubuntu: [
            { src: 'https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgo6eA.ttf' },
            {
                src: 'https://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvTtw.ttf',
                fontWeight: 700,
            },
        ],
        Raleway: [
            {
                src: 'https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCP.ttf',
            },
            {
                src: 'https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCP.ttf',
                fontWeight: 700,
            },
        ],
        Roboto: [
            { src: 'https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Me5Q.ttf' },
            {
                src: 'https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmWUlvAw.ttf',
                fontWeight: 700,
            },
        ],
        Hind: [
            { src: 'https://fonts.gstatic.com/s/hind/v16/5aU69_a8oxmIRG4.ttf' },
            {
                src: 'https://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfNJdIRs.ttf',
                fontWeight: 700,
            },
        ],
        Lato: [
            { src: 'https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVew8.ttf' },
            {
                src: 'https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVew8.ttf',
                fontWeight: 700,
            },
        ],
    },
    'Sans Serif': {
        Roboto: [
            { src: 'https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Me5Q.ttf' },
            {
                src: 'https://fonts.gstatic.com/s/roboto/v32/KFOlCnqEu92Fr1MmWUlvAw.ttf',
                fontWeight: 700,
            },
        ],
        Lato: [
            { src: 'https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVew8.ttf' },
            {
                src: 'https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVew8.ttf',
                fontWeight: 700,
            },
        ],
        Montserrat: [
            {
                src: 'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf',
            },
            {
                src: 'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-.ttf',
                fontWeight: 700,
            },
        ],
        'Open Sans': [
            {
                src: 'https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4n.ttf',
            },
            {
                src: 'https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1y4n.ttf',
                fontWeight: 700,
            },
        ],
        Raleway: [
            {
                src: 'https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCP.ttf',
            },
            {
                src: 'https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCP.ttf',
                fontWeight: 700,
            },
        ],
    },
    Serif: {
        Caladea: [
            {
                src: 'https://fonts.gstatic.com/s/caladea/v7/kJEzBugZ7AAjhybUjR8.ttf',
            },
            {
                src: 'https://fonts.gstatic.com/s/caladea/v7/kJE2BugZ7AAjhybUtaNY39o.ttf',
                fontWeight: 700,
            },
        ],
        Lora: [
            { src: 'https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787weuyJG.ttf' },
            {
                src: 'https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787z5vCJG.ttf',
                fontWeight: 700,
            },
        ],
        'Roboto Slab': [
            {
                src: 'https://fonts.gstatic.com/s/robotoslab/v34/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISWaA.ttf',
            },
            {
                src: 'https://fonts.gstatic.com/s/robotoslab/v34/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoa4OWaA.ttf',
                fontWeight: 700,
            },
        ],
        'Playfair Display': [
            {
                src: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.ttf',
            },
            {
                src: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQ.ttf',
                fontWeight: 700,
            },
        ],
        Merriweather: [
            {
                src: 'https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5Oew.ttf',
            },
            {
                src: 'https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52xwNpXw.ttf',
                fontWeight: 700,
            },
        ],
    },
} as const;

/* Register fonts */

Object.values(FONTS).map((fontFamily) => {
    Object.entries(fontFamily).map(([fontName, fontSources]) => {
        Font.register({
            family: fontName as string,
            fonts: fontSources,
        });
    });
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
            fontWeight: 700,
            fontSize: styles.font.fontSize * 3,
            textTransform: styles.font.headlineCapitalization,
        },
        h1: {
            fontWeight: 700,
            fontSize: styles.font.fontSize * 2,
            textTransform: styles.font.headlineCapitalization,
        },
        h2: {
            fontWeight: 700,
            fontSize: styles.font.fontSize * 1.75,
            textTransform: styles.font.headlineCapitalization,
        },
        h3: {
            fontWeight: 700,
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
