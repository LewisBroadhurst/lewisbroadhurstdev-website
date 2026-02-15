import React from 'react';

const ServicesView = () => (
    <section className='flex flex-col gap-10'>
        <section className='flex flex-col gap-5'>
            <h2 className='text-4xl'>Mentoring</h2>
            <section>
                <h2 className='text-2xl'>Introduction</h2>
                <p>
                    20 minute call where we get to know more about each other and discuss your goals.
                    We will set out an achievable and actionable plan.
                </p>
            </section>
            <section className='flex flex-col gap-2'>
                <section>
                    <section className='flex flex-row items-baseline gap-8'>
                        <h2 className='text-2xl'>Core Package</h2>
                        <span>From £50 per hour</span>
                    </section>
                    <p>Flexible package where we can work with each other on a per hour basis</p>
                </section>
                <ul className='list-disc list-outside pl-6'>
                    <li>CV Review and Interview prep covering the whole stack</li>
                    <li>Career roadmap</li>
                    <li>Preparing for a career in tech</li>
                </ul>
            </section>
            <section className='flex flex-col gap-2'>
                <section>
                    <section className='flex flex-row items-baseline gap-8'>
                        <h2 className='text-2xl'>Premium Package</h2>
                        <span>From £200</span>
                    </section>
                    <p>Comprehensive package to get you interview ready</p>
                </section>
                <ul className='list-disc list-outside pl-6'>
                    <li>Complete CV review and rewrite</li>
                    <li>Two mock interview sessions covering the whole stack</li>
                    <li>Technical gap assessment and side project support</li>
                </ul>
            </section>
        </section>

        <section className='flex flex-col gap-5'>
            <h2 className='text-4xl'>Professional Website Build</h2>
            <section>
                <h2>Consultation</h2>
            </section>
            <section>
                <h2>Professional Landing Page</h2>
                <ul className='list-disc list-outside pl-6'>
                    <li>Up to 5 pages matching your desired look and feel</li>
                    <li>Built with Next.JS</li>
                    <li>Contact automation</li>
                </ul>
            </section>
            <section>
                <h2>Consultation</h2>
                <ul className='list-disc list-outside pl-6'>
                    <li>Integration of payments for services via stripe</li>
                </ul>
            </section>
        </section>
    </section>

)

export default ServicesView;