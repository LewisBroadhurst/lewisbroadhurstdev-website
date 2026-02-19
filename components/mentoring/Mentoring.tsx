import React from 'react';
import {Button, Separator} from "@radix-ui/themes";
import SectionLayout from "@/components/layout/SectionLayout";
import MentorshipTailoring from "@/components/mentoring/MentorshipTailoring";

const Mentoring = () => (
    <section className='flex flex-col'>
        <SectionLayout className='flex flex-col gap-16 py-10 sm:py-20 md:py-40'>
            <section className='flex flex-col gap-2 w-2/3'>
                <h2 className='text-2xl sm:text-5xl'>Strategic career mentorship for the next generation of
                    Developers</h2>
                <p className='text-sm sm:text-base text-[var(--gold-8)]'>
                    CV positioning, interview preparation, and technical roadmap planning, guided by real
                    front-office finance experience
                </p>
            </section>

            <div>
                <Button
                    size={{initial: "3", xs: "4"}}
                    className='hover:cursor-pointer'
                    onClick={() => window.open('https://calendly.com/lewis1broadhurst/15min', '_blank')}
                >
                    Book an Intro call
                </Button>
            </div>
        </SectionLayout>


        <MentorshipTailoring/>

        <SectionLayout className='flex flex-col gap-4 sm:items-center sm:text-center py-10 sm:py-20 md:py-40'>
            <h3 className='text-4xl'>Ready to grow?</h3>
            <p className='sm:w-1/2 text-[var(--gold-7)]'>Book a free 15-minute call to assess your current position and
                outline clear next
                steps. No
                obligation.</p>
            <div>
                <Button
                    size={{initial: "3", xs: "4"}}
                    className='hover:cursor-pointer'
                    onClick={() => window.open('https://calendly.com/lewis1broadhurst/15min', '_blank')}
                >
                    Get Started
                </Button>
            </div>
        </SectionLayout>

    </section>
);

export default Mentoring;