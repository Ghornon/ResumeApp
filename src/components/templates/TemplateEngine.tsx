import { ResumeType } from '../../types/Resume.types';
import ExampleTemplate from './example/ExampleTemplate';
import SimpleTemplate from './Simple';
import Test2 from './Test2';

const TemplateEngine = ({ resumeData }: { resumeData: ResumeType }) => {
    // Template name: Test
    if (resumeData && resumeData.templateId == 'YkiMcs97uzGSKlIvjQIR')
        return <ExampleTemplate resumeData={resumeData} />;

    // Template name: Simple
    if (resumeData && resumeData.templateId == 'ii0vxWRMXcgY2SlH6k9W')
        return <SimpleTemplate resumeData={resumeData} />;

    return <Test2 resumeData={resumeData} />;
};

export default TemplateEngine;
