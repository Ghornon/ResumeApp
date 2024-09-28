import { Timestamp } from 'firebase/firestore';
import { TemplateStyles } from './TemplateStyles.types';

export enum languageLevel {
    A1 = 'A1 - Elementary',
    A2 = 'A2 - Pre-intermediate',
    B1 = 'B1 - Intermediate',
    B2 = 'B2 - Upper intermediate',
    C1 = 'C1 - Advanced',
    C2 = 'C2 - Proficiency or native',
}

export type EmploymentHistoryItem = {
    [index: string]: string | Timestamp;
    jobTitle: string;
    employer: string;
    startDate: Timestamp;
    endDate: Timestamp;
    city: string;
    description: string;
};

export type SkillItem = {
    [index: string]: string | number;
    skillName: string;
    level: number;
};

export type EducationHistoryItem = {
    [index: string]: string | Timestamp;
    schoolName: string;
    degree: string;
    startDate: Timestamp;
    endDate: Timestamp;
    city: string;
    description: string;
};

export type LanguageItem = {
    language: string;
    level: languageLevel;
};

export type ResumeType = {
    uid: string;
    name: string;
    templateId: string;
    timestamp: Timestamp;
    personalDetails: {
        [index: string]: string;
        jobTitle: string;
        photoUrl: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        country: string;
        city: string;
    };
    summary: string;
    employmentHistory: Array<EmploymentHistoryItem>;
    educationHistory: Array<EducationHistoryItem>;
    skills: Array<SkillItem>;
    languages: Array<LanguageItem>;
    footer: string;
    templateStyles: TemplateStyles;
};
