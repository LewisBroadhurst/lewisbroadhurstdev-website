import React from 'react';
import {Card} from "@radix-ui/themes/dist/esm";

type Props = {
    icon: JSX.Element,
    title: string,
    text: string
}

const TailoredMentorshipCard = ({icon, title, text}: Props) => (
    <Card className='shadow-sm shadow-orange-950 hover:shadow-md hover:shadow-amber-900'>
        <section className={'flex flex-col gap-4'}>
            <Card className='w-fit text-[var(--gold-9)]'>
                {icon}
            </Card>
            <h4 className='text-lg sm:text-2xl'>{title}</h4>
            <p className='text-sm sm:text-base text-[var(--gray-10)]'>
                {text}
            </p>
        </section>
    </Card>
)

export default TailoredMentorshipCard