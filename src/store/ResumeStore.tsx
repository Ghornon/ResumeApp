import { doc, setDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ResumeType } from '../types/Resume.types';
import debounce from 'lodash.debounce';
import { db } from '../config/firebase';

export const useResumeStore = create((set) => ({
    uid: '',
    name: 'New resume',
    template: '',
    timestamp: '',
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
    setName: (newState) => set({ name: newState }),
    setTemplate: (newState) => set({ template: newState }),
    setSummary: (newState) => set({ summary: newState }),
    setPersonalDetails: (newState) => set({ personalDetails: newState }),
    setEmploymentHistory: (newState) => set({ employmentHistory: newState }),
    setEducationHistory: (newState) => set({ educationHistory: newState }),
    setSkills: (newState) => set({ skills: newState }),
    setLanguages: (newState) => set({ languages: newState }),
    setDocId: (newState) => set({ docId: newState }),
    setData: (data) => set((state) => ({ ...state, ...data })),
}));

/* 
export const useResumeStore = create(
    persist(
        (set, get) => ({
            docId: '',
            uid: '',
            name: 'New resume',
            template: '',
            timestamp: '',
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
            setName: (newState) => set({ name: newState }),
            setTemplate: (newState) => set({ template: newState }),
            setSummary: (newState) => set({ summary: newState }),
            setPersonalDetails: (newState) => set({ personalDetails: newState }),
            setEmploymentHistory: (newState) => set({ employmentHistory: newState }),
            setEducationHistory: (newState) => set({ educationHistory: newState }),
            setSkills: (newState) => set({ skills: newState }),
            setLanguages: (newState) => set({ languages: newState }),
            setDocId: (newState) => set({ docId: newState }),
            setData: (data) => set((state) => ({ ...state, ...data })),
        }),
        {
            name: 'firestore', // Unique name for the item in storage
            storage: createJSONStorage(() => sessionStorage), // Optional: Use your own storage
        },
    ),
); */
