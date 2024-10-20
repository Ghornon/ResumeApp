import type { ResumeSkills } from '../types';
import type { ResumeSectionToLines } from '../types';
import { getSectionLinesByKeywords } from '../extract-resume-from-sections/lib/get-section-lines';

import {
    getBulletPointsFromLines,
    getDescriptionsLineIdx,
    getFirstBulletPointLineIdx,
} from '../extract-resume-from-sections/lib/bullet-points';
import { getMostFrequentCharacterInRange } from './lib/most-frequent-character';

export const extractSkills = (sections: ResumeSectionToLines) => {
    const lines = getSectionLinesByKeywords(sections, ['skill']);
    const descriptionsLineIdx = getDescriptionsLineIdx(lines) ?? 0;
    const descriptionsLines = lines.slice(descriptionsLineIdx);
    const descriptions = getBulletPointsFromLines(descriptionsLines);

    const firstBulletPointLineIndex = getFirstBulletPointLineIdx(lines);

    const featuredSkills = [] as Array<string>;

    if (descriptionsLineIdx !== 0) {
        const featuredSkillsLines = lines.slice(0, descriptionsLineIdx);

        const featuredSkillsTextItems = featuredSkillsLines
            .flat()
            .filter((item) => item.text.trim())
            .slice(0, 6);

        featuredSkillsTextItems.forEach((textItem) => {
            featuredSkills.push(textItem.text);
        });
    }

    // Convert description lines into skills array
    // Check if lines have bullet points
    if (firstBulletPointLineIndex === undefined) {
        // If not convert all items into array
        const extractedSkillItems = descriptionsLines.flat().map((item) => item.text.trim());
        featuredSkills.push(...extractedSkillItems);
    } else {
        // If bullet points exist then extract skill items from description
        descriptions.forEach((currentLine) => {
            const categoryLineInx = currentLine.indexOf(':');

            const skills = currentLine.slice(categoryLineInx + 1, currentLine.length);

            // Grab the most common separator, split text into segments
            const separator = getMostFrequentCharacterInRange(skills, [',', '.', '|', '-']);

            const extractedSkillItems = skills.split(separator).map((text) => text.trim());

            featuredSkills.push(...extractedSkillItems);
        });
    }

    const skills: ResumeSkills = {
        featuredSkills,
        descriptions,
    };

    return { skills };
};
