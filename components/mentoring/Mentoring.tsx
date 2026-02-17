import React from 'react';
import {Button, Separator} from "@radix-ui/themes";
import SectionLayout from "@/components/layout/SectionLayout";
import MentorshipTailoring from "@/components/mentoring/MentorshipTailoring";

const Mentoring = () => (
    <section className='flex flex-col'>
        <SectionLayout className='flex flex-col gap-16 py-40'>
            <section className='flex flex-col gap-2 w-2/3'>
                <h2 className='text-5xl'>Strategic career mentorship for the next generation of Developers</h2>
                <p className='text-[var(--gold-8)]'>
                    CV positioning, interview preparation, and technical roadmap planning, guided by real
                    front-office finance experience
                </p>
            </section>

            <section className='flex gap-4'>
                <Button size='4'>Book an Intro call</Button>
            </section>
        </SectionLayout>


        <MentorshipTailoring/>

        <SectionLayout className='flex flex-col gap-16 items-center text-center py-40'>
            <h3 className='text-4xl'>Ready to grow?</h3>
            <p className=''>Book a free 15-minute call to assess your current position and outline clear next steps. No
                obligation.</p>
            <div className=''>
                <Button size='4'>Get Started</Button>
            </div>
        </SectionLayout>

    </section>
);

export default Mentoring;