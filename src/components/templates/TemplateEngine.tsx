import { ResumeType } from '../../types/Resume.types';
import ExampleTemplate from './example/ExampleTemplate';
import SimpleTemplate from './Simple';

const TemplateEngine = ({ resumeData }: { resumeData: ResumeType }) => {
    // Template name: Test
    if (resumeData && resumeData.templateId == 'YkiMcs97uzGSKlIvjQIR')
        return <ExampleTemplate resumeData={resumeData} />;
    // Template name: Simple

    if (resumeData && resumeData.templateId == 'ii0vxWRMXcgY2SlH6k9W')
        return <SimpleTemplate resumeData={resumeData} />;

    return <ExampleTemplate resumeData={resumeData} />;
};

export default TemplateEngine;
