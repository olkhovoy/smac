
import React from 'react';
import type { SectionId } from '../types';

interface SidebarProps {
    sectionIds: {id: SectionId, title: string}[];
    activeSection: SectionId;
    setActiveSection: (id: SectionId) => void;
}

const iconMap: { [key in SectionId]: string } = {
    goal: 'fa-bullseye',
    architecture: 'fa-sitemap',
    interfaces: 'fa-plug',
    scenarios: 'fa-gamepad',
    prompts: 'fa-terminal',
    metrics: 'fa-chart-line',
    quickstart: 'fa-rocket',
    analysis: 'fa-lightbulb',
};

export const Sidebar: React.FC<SidebarProps> = ({ sectionIds, activeSection, setActiveSection }) => {
    return (
        <nav className="fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-700/50 p-5 flex flex-col">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-teal-400">SMAC Dashboard</h1>
                <p className="text-sm text-gray-400">AMAL vs MAPPO</p>
            </div>
            <ul className="flex flex-col gap-2">
                {sectionIds.map(({id, title}) => (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveSection(id);
                                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                                activeSection === id
                                    ? 'bg-teal-500/20 text-teal-300 font-semibold'
                                    : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
                            }`}
                        >
                            <i className={`fa-fw fa ${iconMap[id]}`}></i>
                            <span>{title.split('&')[0].trim()}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
