export enum FontSize {
    XXS = 8,
    XS = 9,
    S = 10,
    M = 11,
    L = 12,
    XL = 13,
    XXL = 14,
}

export enum HeadlineCapitalization {
    capitalize = 'capitalize',
    uppercase = 'uppercase',
    lowercase = 'lowercase',
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
    [index: string]: string | number | object;
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
