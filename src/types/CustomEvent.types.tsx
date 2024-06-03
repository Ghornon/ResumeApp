import {
    EducationHistoryItem,
    EmploymentHistoryItem,
    LanguageItem,
    SkillItem,
} from './Resume.types';

export type CustomEventType = {
    target: {
        name: string;
        value: Array<EmploymentHistoryItem | EducationHistoryItem | LanguageItem | SkillItem>;
    };
};
