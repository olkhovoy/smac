
import React from 'react';

interface FileTreeProps {
    structure: string;
}

export const FileTree: React.FC<FileTreeProps> = ({ structure }) => {
    const lines = structure.trim().split('\n');

    const renderNode = (line: string) => {
        const isFile = line.includes('#');
        const icon = isFile ? 'fa-regular fa-file-code' : 'fa-regular fa-folder';
        const indent = (line.search(/\S/) / 2) * 20; // 20px per indent level
        
        const [name, comment] = line.split('#').map(s => s.trim());

        return (
            <div className="flex items-center gap-2 text-sm" style={{ paddingLeft: `${indent}px` }}>
                <i className={`fa-fw ${icon} ${isFile ? 'text-gray-400' : 'text-teal-400'}`}></i>
                <span className="text-gray-200">{name}</span>
                {comment && <span className="text-gray-500 text-xs">// {comment}</span>}
            </div>
        );
    };

    return (
        <div className="font-mono bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="space-y-2">
                {lines.map((line, index) => (
                    <React.Fragment key={index}>
                        {renderNode(line)}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
