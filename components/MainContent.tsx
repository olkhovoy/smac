
import React from 'react';
import { experimentData } from '../constants';
import type { SectionId } from '../types';
import { Section } from './Section';

interface MainContentProps {
    activeSection: SectionId;
    onExplainRequest: (sectionId: SectionId) => void;
}

export const MainContent: React.FC<MainContentProps> = ({ onExplainRequest }) => {
    return (
        <main className="w-full">
            <h1 className="text-4xl font-bold mb-2 text-gray-100 tracking-tight">{experimentData.title}</h1>
            <p className="text-lg text-gray-400 mb-12">An interactive dashboard for the AMAL vs MAPPO experiment on SMAC.</p>
            
            <div className="space-y-16">
                {experimentData.sections.map((section) => (
                    <Section
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        content={section.content}
                        onExplainRequest={() => onExplainRequest(section.id)}
                    />
                ))}
            </div>
        </main>
    );
};
