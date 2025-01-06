export enum FontSize {
    XXS = 8,
    XS = 9,
    S = 10,
    M = 11,
    L = 12,
    XL = 13,
    XXL = 14,
}

export enum HeadlineCapitalization {
    capitalize = 'capitalize',
    uppercase = 'uppercase',
    lowercase = 'lowercase',
}

export enum Layout {
    Education = 'Education',
    Work = 'Work',
    Skills = 'Skills',
    Projects = 'Projects',
    Certificates = 'Certificates',
    Achievements = 'Achievements',
    Languages = 'Languages',
    Interests = 'Interests',
}

export type Font = {
    fontName: string;
    fontSize: FontSize;
    lineSpacing: number;
    headlineCapitalization: HeadlineCapitalization;
};

export type Format = {
    dateFormat: string;
    isFooterVisible: boolean;
};

export type Columns = {
    isSingleColumn: boolean;
    leftColumnItems: Layout[];
    rightColumnItems: Layout[];
};

export type Colors = {
    bgColor: string;
    fontColor: string;
    highlightColor: string;
};

export type TemplateStyles = {
    [index: string]: string | number | object;
    layout: Columns;
    font: Font;
    format: Format;
    colors: Colors;
    templateId: string;
};

import { Timestamp } from 'firebase/firestore';

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

export type PersonalDetails = {
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

export type ResumeType = {
    uid: string;
    name: string;
    templateId: string;
    timestamp: Timestamp;
    personalDetails: PersonalDetails;
    summary: string;
    employmentHistory: Array<EmploymentHistoryItem>;
    educationHistory: Array<EducationHistoryItem>;
    skills: Array<SkillItem>;
    languages: Array<LanguageItem>;
    footer: string;
    templateStyles: TemplateStyles;
};

export type TemplateType = {
    name: string;
    description: string;
    posterUrl: string;
    tags: [string];
};
export type SignInFormType = {
    email: string;
    password: string;
    firebase: string;
};
export type SignUpFormType = SignInFormType & {
    retype: string;
    firstName: string;
    lastName: string;
};

export type UserType = {
    uid: string;
    authProvider: string;
    email: string;
    displayName: string;
    photoURL: string;
};
