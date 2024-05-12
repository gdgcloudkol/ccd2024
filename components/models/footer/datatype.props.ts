export interface FooterListContent {
    title: string;
    link?: string;
    hyperlink?: string;
}

export interface FooterSectionContent {
    title: string;
    list: FooterListContent[];
}


export interface FooterContent {
    title: string;
    sections: FooterSectionContent[];
}