import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import _set from 'lodash.set';
import {
    EducationHistoryItem,
    EmploymentHistoryItem,
    LanguageItem,
    ResumeType,
    SkillItem,
} from '../types/Resume.types';
import { Timestamp } from 'firebase/firestore';
import { FontSize, HeadlineCapitalization } from '../types/TemplateStyles.types';

interface IResumeStore extends ResumeType {
    setName: (newState: string) => void;
    setTemplateId: (newState: string) => void;
    setSummary: (newState: string) => void;
    setPersonalDetails: (newState: ResumeType['personalDetails']) => void;
    setEmploymentHistory: (newState: Array<EmploymentHistoryItem>) => void;
    setEducationHistory: (newState: Array<EducationHistoryItem>) => void;
    setSkills: (newState: Array<SkillItem>) => void;
    setLanguages: (newState: Array<LanguageItem>) => void;
    setFooter: (newState: string) => void;
    setTemplateStyles: (newState: ResumeType['templateStyles']) => void;
    setData: (data: ResumeType) => void;
    setValue: (path: string, value: ResumeType) => void;
    reset: () => void;
}

const initialState: ResumeType = {
    uid: '',
    name: 'New resume',
    templateId: '',
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
    footer: '',
    templateStyles: {
        layout: {
            isSingleColumn: false,
            leftColumnItems: [],
            rightColumnItems: [],
        },
        font: {
            fontName: 'Arial',
            fontSize: FontSize.M,
            lineSpacing: 1,
            headlineCapitalization: HeadlineCapitalization.capitalize,
        },
        format: {
            dateFormat: 'dd-mm-yyyy',
            isFooterVisible: true,
        },
        colors: {
            bgColor: 'white',
            fontColor: 'black',
            highlightColor: 'black',
        },
        templateId: '',
    },
};

/* export const useResumeStore = create<IResumeStore>((set) => ({
    ...initialState,
    setName: (newState) => set({ name: newState }),
    setTemplateId: (newState) => set({ templateId: newState }),
    setSummary: (newState) => set({ summary: newState }),
    setPersonalDetails: (newState) => set({ personalDetails: newState }),
    setEmploymentHistory: (newState) => set({ employmentHistory: newState }),
    setEducationHistory: (newState) => set({ educationHistory: newState }),
    setSkills: (newState) => set({ skills: newState }),
    setLanguages: (newState) => set({ languages: newState }),
    setFooter: (newState) => set({ footer: newState }),
    setTemplateStyles: (newState) => set({ templateStyles: newState }),
    setData: (data) => set((state: ResumeType) => ({ ...state, ...data })),
    reset: () => {
        set(initialState);
    },
}));
 */

export const useResumeStore = create<IResumeStore>()(
    immer((set) => ({
        ...initialState,
        setName: (newState) => set({ name: newState }),
        setTemplateId: (newState) => set({ templateId: newState }),
        setSummary: (newState) => set({ summary: newState }),
        setPersonalDetails: (newState) => set({ personalDetails: newState }),
        setEmploymentHistory: (newState) => set({ employmentHistory: newState }),
        setEducationHistory: (newState) => set({ educationHistory: newState }),
        setSkills: (newState) => set({ skills: newState }),
        setLanguages: (newState) => set({ languages: newState }),
        setFooter: (newState) => set({ footer: newState }),
        setTemplateStyles: (newState) => set({ templateStyles: newState }),
        setData: (data) => set((state: ResumeType) => ({ ...state, ...data })),
        setValue: (path, value) => {
            set((state: ResumeType) => {
                state = _set(state, path, value);
            });
        },
        reset: () => {
            set(initialState);
        },
    })),
);
