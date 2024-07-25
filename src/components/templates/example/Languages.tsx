import { View } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';
import { LanguageItem, ResumeType } from '../../../types/Resume.types';

const LanguageEntry = ({ languages }: { languages: LanguageItem[] }) => (
    <View>
        <List>
            {languages.map((language, index) => (
                <Item key={`language-${index}`}>
                    {language.language} {language.level}
                </Item>
            ))}
        </List>
    </View>
);

const Languages = ({ resumeData }: { resumeData: ResumeType }) => (
    <View>
        <Title>Languages</Title>
        <LanguageEntry languages={resumeData.languages} />
    </View>
);

export default Languages;
