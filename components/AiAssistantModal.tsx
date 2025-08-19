
import React from 'react';
import type { Explanation } from '../types';

interface AiAssistantModalProps extends Explanation {
    onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ status, content, onClose }) => {
    const renderContent = () => {
        switch (status) {
            case 'loading':
                return (
                    <div className="flex flex-col items-center justify-center h-48">
                        <i className="fa-solid fa-spinner fa-spin text-4xl text-teal-400"></i>
                        <p className="mt-4 text-gray-300">Generating explanation...</p>
                    </div>
                );
            case 'success':
                return (
                    <div 
                        className="prose prose-invert prose-sm max-w-none text-gray-300" 
                        dangerouslySetInnerHTML={{ __html: content || '' }}
                    />
                );
            case 'error':
                 return (
                    <div className="flex flex-col items-center justify-center h-48 text-center">
                        <i className="fa-solid fa-circle-exclamation text-4xl text-red-400"></i>
                        <p className="mt-4 text-red-300">{content}</p>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <i className="fa-solid fa-wand-magic-sparkles text-teal-400"></i>
                        <span>AI Assistant</span>
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <i className="fa-solid fa-xmark fa-lg"></i>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
