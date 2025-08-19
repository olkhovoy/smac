
export type SectionId =
    | 'goal'
    | 'architecture'
    | 'interfaces'
    | 'scenarios'
    | 'prompts'
    | 'metrics'
    | 'quickstart'
    | 'analysis';

export interface CodeSnippet {
    language: 'python' | 'yaml' | 'bash' | 'json';
    code: string;
}

export interface SectionContent {
    text?: string;
    code?: CodeSnippet;
    list?: string[];
    structure?: string;
    metrics?: { [key: string]: string[] };
    table?: { headers: string[]; rows: string[][] };
    cards?: { title: string; confidence: number; details: string[] }[];
}

export interface Section {
    id: SectionId;
    title: string;
    content: SectionContent;
}

export interface ExperimentData {
    title: string;
    sections: Section[];
}

export interface Explanation {
    status: 'idle' | 'loading' | 'success' | 'error';
    content: string | null;
}
