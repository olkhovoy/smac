
import React, { useState, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { AiAssistantModal } from './components/AiAssistantModal';
import { getExplanation } from './services/geminiService';
import { experimentData } from './constants';
import type { Explanation, SectionId } from './types';

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionId>('goal');
    const [explanation, setExplanation] = useState<Explanation>({ status: 'idle', content: null });

    const handleExplainRequest = useCallback(async (sectionId: SectionId) => {
        setExplanation({ status: 'loading', content: null });
        try {
            const section = experimentData.sections.find(s => s.id === sectionId);
            if (!section) {
                throw new Error('Section not found');
            }
            const response = await getExplanation(section.title, section.content);
            setExplanation({ status: 'success', content: response });
        } catch (error) {
            console.error('Error getting explanation:', error);
            setExplanation({ status: 'error', content: 'Sorry, I couldn\'t generate an explanation. Please check the API key and try again.' });
        }
    }, []);

    const handleCloseModal = () => {
        setExplanation({ status: 'idle', content: null });
    };

    const sectionIds = useMemo(() => experimentData.sections.map(s => ({ id: s.id, title: s.title })), []);

    return (
        <div className="flex min-h-screen font-sans bg-gray-900 text-gray-200">
            <Sidebar sectionIds={sectionIds} activeSection={activeSection} setActiveSection={setActiveSection} />
            <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 ml-64">
                <MainContent activeSection={activeSection} onExplainRequest={handleExplainRequest} />
            </div>
            {explanation.status !== 'idle' && (
                <AiAssistantModal
                    status={explanation.status}
                    content={explanation.content}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default App;
