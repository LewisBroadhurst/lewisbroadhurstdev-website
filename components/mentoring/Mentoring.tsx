import React from 'react';
import {Button} from "@radix-ui/themes";
import SectionLayout from "@/components/layout/SectionLayout";
import MentorshipTailoring from "@/components/mentoring/MentorshipTailoring";
import owl from './quant_owl.png';
import Image from "next/image";

const Mentoring = () => (
    <section className='flex flex-col'>
        <SectionLayout className='flex items-center'>
            <section className='flex flex-col gap-8 py-10 sm:gap-16 sm:py-20 md:py-40'>
                <section className='flex flex-col gap-2 sm:w-2/3 md:w-4/5 lg:w-2/3'>
                    <h2 className='text-xl md:text-5xl'>Strategic career mentorship for the next generation of
                        Developers</h2>
                    <p className='text-sm md:text-base text-[var(--gold-8)]'>
                        CV positioning, interview preparation, and technical roadmap planning, guided by real
                        front-office finance experience
                    </p>
                </section>

                <div className='flex flex-row items-center gap-4'>
                    <Button
                        size={{initial: "3", xs: "4"}}
                        className='hover:cursor-pointer'
                        onClick={() => window.open('https://calendly.com/lewis1broadhurst/15min', '_blank')}
                    >
                        Book an Intro call
                    </Button>
                    <Image className='w-[50px] sm:hidden' src={owl} alt={''}/>
                </div>
            </section>

            <Image className='hidden sm:w-[150px] md:flex md:w-[260px]' src={owl} alt={''}/>
        </SectionLayout>


        <MentorshipTailoring/>

        <SectionLayout className='flex flex-col gap-4 sm:items-center sm:text-center py-10 sm:py-20 md:py-40'>
            <h3 className='text-2xl sm:text-4xl'>Ready to grow?</h3>
            <p className='text-sm sm:text-base sm:w-1/2 text-[var(--gold-7)]'>Book a free 15-minute call to assess your
                current position and
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