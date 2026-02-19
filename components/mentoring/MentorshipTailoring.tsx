import React from 'react';
import SectionLayout from "@/components/layout/SectionLayout";
import {CalendarIcon, CodeIcon, PersonIcon} from "@radix-ui/react-icons";
import TailoredMentorshipCard from "@/components/mentoring/TailoredMentorshipCard";

const MentorshipTailoring = () => (
    <SectionLayout
        backgroundColor="bg-[var(--gray-2)]"
        className='flex flex-col gap-8 py-10 sm:gap-16 sm:py-20 md:py-40 md:text-center'
    >
        <h3 className='text-2xl sm:text-4xl'>Tailored Mentorship</h3>
        <section className='flex flex-col md:flex-row gap-10'>
            <TailoredMentorshipCard
                icon={<CodeIcon width={24} height={24}/>}
                title='Project Mentoring'
                text='Get feedback on your projects, learn best practices, and build a portfolio that stands out.'
            />
            <TailoredMentorshipCard
                icon={<CalendarIcon width={24} height={24}/>}
                title='Career Navigation'
                text='Strategic advice on career paths, promotions, and making the right moves at the right time.'
            />
            <TailoredMentorshipCard
                icon={<PersonIcon width={24} height={24}/>}
                title='Interview Preparation'
                text='Mock interviews, resume reviews, and insider tips from someone who`s been on both sides of the
                        table.'
            />
        </section>
    </SectionLayout>
)

export default MentorshipTailoring;