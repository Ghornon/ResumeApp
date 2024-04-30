import { Timestamp } from 'firebase/firestore';

enum languageLevel {
    A1,
    A2,
    B1,
    B2,
    C1,
    C2,
}

export type ResumeType = {
    uid: string;
    name: string;
    personalDetails: {
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
    employmentHistory: [
        {
            companyName: string;
            jobTitle: string;
            employer: string;
            startDate: Timestamp;
            endDate: Timestamp;
            city: string;
            description: string;
        },
    ];
    educationHistory: [
        {
            schoolName: string;
            degree: string;
            startDate: Timestamp;
            endDate: Timestamp;
            city: string;
            description: string;
        },
    ];
    skills: [{ skillName: string; level: number }];
    languages: [
        {
            language: string;
            level: languageLevel;
        },
    ];
};
