import { create } from 'zustand';
import {
    EducationHistoryItem,
    EmploymentHistoryItem,
    LanguageItem,
    ResumeType,
    SkillItem,
} from '../types/Resume.types';
import { Timestamp } from 'firebase/firestore';

interface IResumeStore extends ResumeType {
    setName: (newState: string) => void;
    setTemplate: (newState: string) => void;
    setSummary: (newState: string) => void;
    setPersonalDetails: (newState: ResumeType['personalDetails']) => void;
    setEmploymentHistory: (newState: Array<EmploymentHistoryItem>) => void;
    setEducationHistory: (newState: Array<EducationHistoryItem>) => void;
    setSkills: (newState: Array<SkillItem>) => void;
    setLanguages: (newState: Array<LanguageItem>) => void;
    setData: (data: ResumeType) => void;
    reset: () => void;
}

const initialState: ResumeType = {
    uid: '',
    name: 'New resume',
    template: '',
    timestamp: Timestamp.now(),
    summary: '',
    personalDetails: {
        jobTitle: '',
        photoUrl: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
    },
    employmentHistory: [],
    educationHistory: [],
    skills: [],
    languages: [],
};

export const useResumeStore = create<IResumeStore>((set) => ({
    ...initialState,
    setName: (newState) => set({ name: newState }),
    setTemplate: (newState) => set({ template: newState }),
    setSummary: (newState) => set({ summary: newState }),
    setPersonalDetails: (newState) => set({ personalDetails: newState }),
    setEmploymentHistory: (newState) => set({ employmentHistory: newState }),
    setEducationHistory: (newState) => set({ educationHistory: newState }),
    setSkills: (newState) => set({ skills: newState }),
    setLanguages: (newState) => set({ languages: newState }),
    setData: (data) => set((state: ResumeType) => ({ ...state, ...data })),
    reset: () => {
        set(initialState);
    },
}));
