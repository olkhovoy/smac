
import React from 'react';

interface AnalysisCardProps {
    title: string;
    confidence: number;
    details: string[];
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, confidence, details }) => {
    const isChallenge = confidence === 0;

    return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 h-full flex flex-col">
            <h4 className="font-bold text-lg mb-2">{title}</h4>
            {!isChallenge && (
                <div className="mb-3">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                            className="bg-teal-500 h-2.5 rounded-full" 
                            style={{ width: `${confidence}%` }}
                        ></div>
                    </div>
                    <span className="text-xs text-gray-400 mt-1 block">{confidence}% Confidence</span>
                </div>
            )}
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400 flex-grow">
                {details.map((detail, index) => <li key={index}>{detail}</li>)}
            </ul>
        </div>
    );
};
