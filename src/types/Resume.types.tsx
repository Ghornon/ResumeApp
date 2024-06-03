import { Timestamp } from 'firebase/firestore';

enum languageLevel {
    A1,
    A2,
    B1,
    B2,
    C1,
    C2,
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
    template: string;
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
};
