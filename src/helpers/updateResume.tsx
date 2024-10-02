import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ResumeType } from '../types/Resume.types';
import debounce from 'lodash.debounce';

export const updateResume = async (data: { resumeId: string; resume: ResumeType }) => {
    const { resumeId, resume } = data;
    const resumeRef = await doc(db, 'resumes', resumeId);

    if (resumeRef) {
        if (process.env.NODE_ENV === 'development') console.log('Saving data...', resumeId, resume);
        await updateDoc(resumeRef, { ...resume, timestamp: Timestamp.now() });
    }
};

export const debouncedUpdateResume = debounce(updateResume, 500);
