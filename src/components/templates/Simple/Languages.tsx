import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';
import { LanguageItem, languageLevel, ResumeType } from '../../../types/Resume.types';

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
        {languages.map((language, index) => (
            <View key={`language-${index}`} style={styles.item}>
                <Text style={styles.language}>{language.language}</Text>
                <Text>{languageLevel[language.level as keyof typeof languageLevel]}</Text>
            </View>
        ))}
    </View>
);

const Languages = ({ resumeData }: { resumeData: ResumeType }) => (
    <View>
        <Title>Languages</Title>
        <LanguageEntry languages={resumeData.languages} />
    </View>
);

export default Languages;
