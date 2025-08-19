
import React from 'react';
import type { SectionId } from '../types';
import type { SectionContent } from '../types';
import { CodeBlock } from './CodeBlock';
import { FileTree } from './FileTree';
import { AnalysisCard } from './AnalysisCard';

interface SectionProps {
    id: SectionId;
    title: string;
    content: SectionContent;
    onExplainRequest: () => void;
}

export const Section: React.FC<SectionProps> = ({ id, title, content, onExplainRequest }) => {
    return (
        <section id={id} className="scroll-mt-20">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-100">{title}</h2>
                <button 
                    onClick={onExplainRequest}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-300 bg-teal-500/10 rounded-lg hover:bg-teal-500/20 transition-colors"
                >
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    <span>Explain with AI</span>
                </button>
            </div>

            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
                {content.text && <p className="text-gray-300 mb-4 leading-relaxed">{content.text}</p>}
                
                {content.list && (
                    <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                        {content.list.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                )}
                
                {content.structure && <FileTree structure={content.structure} />}
                
                {content.code && <CodeBlock language={content.code.language} code={content.code.code} />}

                {content.table && (
                     <div className="overflow-x-auto">
                        <table className="w-full text-left table-auto">
                            <thead className="bg-gray-700/50 text-gray-300 uppercase text-sm">
                                <tr>
                                    {content.table.headers.map(header => <th key={header} className="p-3">{header}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {content.table.rows.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-700/50">
                                        {row.map((cell, cellIndex) => <td key={cellIndex} className="p-3 text-gray-300">{cell}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {content.cards && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {content.cards.map((card, index) => <AnalysisCard key={index} {...card} />)}
                    </div>
                )}

            </div>
        </section>
    );
};
