import React from 'react';
import {Box, Card} from "@radix-ui/themes";
import SectionLayout from "@/components/layout/SectionLayout";
import {CalendarIcon, CodeIcon, PersonIcon, LinkedInLogoIcon} from "@radix-ui/react-icons";

const MentorshipTailoring = () => (
    <SectionLayout backgroundColor="bg-[var(--gray-2)]" className='flex flex-col gap-16 py-40 text-center'>
        <h3 className='text-4xl'>Tailored Mentorship</h3>
        <section className='flex flex-row gap-10'>
            <Card>
                <section className={'flex flex-col gap-4'}>
                    <Card className='w-fit text-[var(--gold-9)]'>
                        <CodeIcon width={24} height={24}/>
                    </Card>
                    <h4 className='text-2xl'>Project Mentoring</h4>
                    <p className='text-[var(--gray-10)]'>
                        Get feedback on your projects, learn best practices, and build a portfolio that stands out.
                    </p>
                </section>
            </Card>
            <Card>
                <section className={'flex flex-col gap-4'}>
                    <Card className='w-fit text-[var(--gold-9)]'>
                        <CalendarIcon width={24} height={24}/>
                    </Card>
                    <h4 className='text-2xl'>Career Navigation</h4>
                    <p className='text-[var(--gray-10)]'>Strategic advice on career paths, promotions, and making the
                        right moves at the right time.</p>
                </section>
            </Card>
            <Card>
                <section className={'flex flex-col gap-4'}>
                    <Card className='w-fit self-justify-center text-[var(--gold-9)]'>
                        <PersonIcon width={24} height={24}/>
                    </Card>
                    <h4 className='text-2xl'>Interview Prep</h4>
                    <p className='text-[var(--gray-10)]'>Mock interviews, resume reviews, and insider tips from someone
                        who's been on both sides of the
                        table.</p>
                </section>

            </Card>
        </section>
    </SectionLayout>
)

export default MentorshipTailoring;