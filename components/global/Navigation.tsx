import React, {FC} from 'react'

enum NavigationTabs {
    MENTORING = 'Mentoring',
    CV = 'CV',
    BLOG = 'Blog',
    PROJECTS = 'Projects',
}

const navTabs: NavigationTabs[] = [
    NavigationTabs.MENTORING,
    NavigationTabs.CV,
    NavigationTabs.BLOG,
    NavigationTabs.PROJECTS,
]

type OwnProps = {
    activeTabKey: string;
    handleTabChange: any;
}

const Navigation: FC<OwnProps> = ({activeTabKey, handleTabChange}) => (
    <nav className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
        <ul className="flex flex-row lg:text-lg text-[var(--gold-7)] gap-2 xl:gap-4">
            {navTabs.map(navTab => (
                <li
                    className={`duration-200 transition-all hover:text-[var(--gold-9)] hover:cursor-pointer ${activeTabKey === navTab && 'text-[var(--gold-9)]'}`}
                    id={navTab} key={navTab} onClick={handleTabChange}
                >
                    {navTab}
                </li>
            ))}
        </ul>
    </nav>
);

export default Navigation

export {NavigationTabs}
