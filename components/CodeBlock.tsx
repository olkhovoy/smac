
import React, { useState, useCallback } from 'react';
import type { CodeSnippet } from '../types';

export const CodeBlock: React.FC<CodeSnippet> = ({ language, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [code]);

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden my-4 border border-gray-700">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800/50">
                <span className="text-xs font-mono text-gray-400">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
                >
                    <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                    {copied ? 'Copied!' : 'Copy code'}
                </button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
                <code className={`language-${language}`}>
                    {code.trim()}
                </code>
            </pre>
        </div>
    );
};
