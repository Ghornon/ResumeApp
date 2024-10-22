import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import _set from 'lodash.set';
import { ResumeType } from '../types/Resume.types';
import { FontSize, HeadlineCapitalization } from '../types/TemplateStyles.types';
import { Timestamp } from 'firebase/firestore';
import { debouncedUpdateResume } from '../helpers/updateResume';

interface IResumeStore {
    resume: ResumeType;
    resumeId: string;
    setValue: (path: string, value: unknown) => void;
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
            fontName: 'Ubuntu',
            fontSize: FontSize.M,
            lineSpacing: 1.5,
            headlineCapitalization: HeadlineCapitalization.capitalize,
        },
        format: {
            dateFormat: 'mm/yyyy',
            isFooterVisible: true,
        },
        colors: {
            bgColor: '#ffffff',
            fontColor: '#000000',
            highlightColor: '#03a9f4',
        },
        templateId: '',
    },
};

export const useResumeStore = create<IResumeStore>()(
    devtools(
        immer((set) => ({
            resume: initialState,
            resumeId: '',
            setValue: (path, value) => {
                set((draft) => {
                    draft.resume = _set(draft.resume, path, value);
                    void debouncedUpdateResume({
                        resumeId: draft.resumeId,
                        resume: JSON.parse(JSON.stringify(draft.resume)),
                    });
                });
            },
            reset: () => {
                set({ resume: initialState });
            },
        })),
    ),
);
