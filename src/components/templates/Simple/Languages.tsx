import { Text, View, StyleSheet } from '@react-pdf/renderer';

import { LanguageItem, languageLevel, ResumeType } from '../../../types/Resume.types';
import H2 from '../_components/H2';

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 10,
        marginBottom: 5,
    },
    language: {
        fontFamily: 'Lato Bold',
        fontSize: 10,
        marginBottom: 2,
    },
});

const LanguageEntry = ({ languages }: { languages: LanguageItem[] }) => (
    <View style={styles.item}>
        {languages.map((language, index) => {
            const level = language.level as languageLevel;
            const indexOfLevel = Object.keys(languageLevel).indexOf(level);
            return (
                <View key={`language-${index}`} style={styles.item}>
                    <Text style={styles.language}>{language.language}</Text>

                    <Text>{Object.values(languageLevel)[indexOfLevel]}</Text>
                </View>
            );
        })}
    </View>
);

const Languages = ({ resumeData }: { resumeData: ResumeType }) => (
    <View>
        <H2>Languages</H2>
        <LanguageEntry languages={resumeData.languages} />
    </View>
);

export default Languages;
