export enum FontSize {
    XXS = 8,
    XS = 10,
    S = 12,
    M = 14,
    L = 16,
    XL = 18,
    XXL = 20,
}

export enum HeadlineCapitalization {
    capitalize,
    uppercase,
    lowercase,
}

export enum Layout {
    Education = 'Education',
    Work = 'Work',
    Skills = 'Skills',
    Projects = 'Projects',
    Certificates = 'Certificates',
    Achievements = 'Achievements',
    Languages = 'Languages',
    Interests = 'Interests',
}

export type TemplateStyles = {
    layout: {
        isSingleColumn: boolean;
        leftColumnItems: Layout[];
        rightColumnItems: Layout[];
    };
    font: {
        fontName: string;
        fontSize: FontSize;
        lineSpacing: number;
        headlineCapitalization: HeadlineCapitalization;
    };
    format: {
        dateFormat: string;
        isFooterVisible: boolean;
    };
    colors: {
        bgColor: string;
        fontColor: string;
        highlightColor: string;
    };
    templateId: string;
};
