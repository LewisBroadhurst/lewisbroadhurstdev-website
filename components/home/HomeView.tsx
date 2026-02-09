import React from 'react'
import MahiMarkets from './Experience/MahiMarkets'
import BNTA from './Experience/BNTA'
import Vanguard from './Experience/Vanguard'
import Citi from "@/components/home/Experience/Citi";

const HomeView = () => {
    return <section className='flex flex-col gap-8'>
        <section className="flex flex-col gap-4 divide-y divide-slate-700">
            <h2 className="text-2xl self-start text-slate-300">About Me</h2>
            <section className="flex flex-col text-slate-500 text-justify py-6">
                Financial Application Engineer with 4 years’ experience building real-time, distributed systems for front-office finance.
                Specialized in FX and Equity platforms in close partnership with front-office teams.
                CMSA certified and CFA Level I candidate (Feb 2026).
            </section>
        </section>

        <section className='flex flex-col gap-4 divide-y divide-slate-700'>
            <h2 className="text-2xl self-start text-slate-300">Experience</h2>
            <Citi />
            <Vanguard />
            <MahiMarkets />
            <BNTA />
        </section>

    </section>
}

export default HomeView
