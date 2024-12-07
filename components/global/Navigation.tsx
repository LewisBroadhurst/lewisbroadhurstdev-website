import React, {FC} from 'react'
import {
    GithubOutlined,
    LinkedinFilled,
    MediumSquareFilled,
    YoutubeFilled,
} from '@ant-design/icons'
import {SocialItem} from '@/components/home/HomeTypes'

type OwnProps = {
    activeTabKey: string
    handleTabChange: any
}

enum NavigationTabs {
    HOME = 'Home',
    BLOG = 'Blog',
    PORTFOLIO = 'Portfolio',
}

const navTabs: NavigationTabs[] = [
    NavigationTabs.HOME,
    NavigationTabs.BLOG,
    NavigationTabs.PORTFOLIO,
]

const socials: SocialItem[] = [
    { icon: <LinkedinFilled />, href: 'https://www.linkedin.com/in/lewis-broadhurst/' },
    { icon: <GithubOutlined />, href: 'https://github.com/LewisBroadhurst' },
    { icon: <YoutubeFilled />, href: 'https://www.youtube.com/channel/UCv8iDXiyBoaNRtPmFt-fOYw' },
    { icon: <MediumSquareFilled />, href: 'https://medium.com/@lewis1broadhurst' },
]

const Navigation: FC<OwnProps> = ({activeTabKey, handleTabChange}) => {
    return (
        <nav className="flex flex-row gap-12 items-center">
            <ul className="flex flex-row gap-4 text-lg text-slate-500">
                {navTabs.map(navTab => (
                    <li
                        className={`duration-200 transition-all hover:text-orange-700 hover:cursor-pointer ${activeTabKey === navTab && 'text-orange-600'}`}
                        id={navTab} key={navTab} onClick={handleTabChange}
                    >
                        {navTab}
                    </li>
                ))}
            </ul>
            <ul className='flex flex-row gap-2 text-lg text-slate-500'>
                {socials.map(social => (
                    <a
                        href={social.href}
                        className="duration-200 transition-all hover:text-orange-700 hover:cursor-pointer"
                        key={social.href}
                        target="_blank"
                    >
                        {social.icon}
                    </a>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation

export {NavigationTabs}
