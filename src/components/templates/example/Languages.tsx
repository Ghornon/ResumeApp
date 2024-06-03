import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Lato Bold',
        fontSize: 11,
        marginBottom: 10,
    },
    skills: {
        fontFamily: 'Lato',
        fontSize: 10,
        marginBottom: 10,
    },
});

const LanguageEntry = ({ languages }: { languages: [] }) => (
    <View>
        <List>
            {languages.map((language) => (
                <Item key={language}>
                    {language.language} {language.level}
                </Item>
            ))}
        </List>
    </View>
);

const Languages = ({ resumeData }: { resumeData: ResumeType }) => (
    <View>
        <Title>Languages</Title>
        <LanguageEntry name="Languages" languages={resumeData.languages} />
    </View>
);

export default Languages;
