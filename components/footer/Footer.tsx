import React from 'react';

import {
    GithubOutlined,
    LinkedinFilled,
    MediumSquareFilled,
    YoutubeFilled,
} from '@ant-design/icons'
import {SocialItem} from '@/components/home/HomeTypes'
import {HeartFilledIcon} from "@radix-ui/react-icons";
import SectionLayout from "@/components/layout/SectionLayout";
import {Separator} from "@radix-ui/themes";

const socials: SocialItem[] = [
    {icon: <LinkedinFilled/>, href: 'https://www.linkedin.com/in/lewis-broadhurst/'},
    {icon: <GithubOutlined/>, href: 'https://github.com/LewisBroadhurst'},
    {icon: <YoutubeFilled/>, href: 'https://www.youtube.com/channel/UCv8iDXiyBoaNRtPmFt-fOYw'},
    {icon: <MediumSquareFilled/>, href: 'https://medium.com/@lewis1broadhurst'},
]

const Footer = () => (
    <SectionLayout>
        <Separator my='0' size='4'/>
        <footer className='text-sm sm:text-base flex flex-row items-center justify-between text-[var(--gold-8)] py-8'>
            <span>Lewis Broadhurst - 2026</span>
            <ul className='flex flex-row gap-2 lg:text-lg'>
                {socials.map(social => (
                    <a
                        href={social.href}
                        className="duration-200 transition-all hover:text-[var(--gold-10)] hover:cursor-pointer"
                        key={social.href}
                        target="_blank"
                    >
                        {social.icon}
                    </a>
                ))}
            </ul>
        </footer>
    </SectionLayout>
);

export default Footer;