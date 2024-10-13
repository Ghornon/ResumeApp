import { pdf } from '@react-pdf/renderer';
import TemplateEngine from '../components/templates/TemplateEngine';
import { ResumeType } from '../types/Resume.types';
import { useResumeStore } from '../store/ResumeStore';

export const buildResumeAsPDF = async (resumeData: ResumeType) => {
    if (!resumeData) return;

    useResumeStore.getState().reset();

    useResumeStore.setState({
        ...useResumeStore.getInitialState,
        resume: {
            ...useResumeStore.getState().resume,
            ...resumeData,
            templateStyles: {
                ...useResumeStore.getState().resume.templateStyles,
                ...resumeData.templateStyles,
            },
        },
    });

    const Document = <TemplateEngine resumeData={resumeData} />;

    const blob = await pdf(Document).toBlob();
    const url = URL.createObjectURL(blob);

    return url;
};
