import React from 'react'
import Header from '@/components/global/Header'
import MentoringView from '@/components/mentoring/MentoringView'
import SectionLayout from '@/components/layout/SectionLayout'
import Footer from '@/components/footer/Footer'

export default function page() {
    return (
        <main className="flex flex-col pt-10">
            <section className="flex flex-col gap-8 md:gap-10">
                <SectionLayout>
                    <Header/>
                </SectionLayout>
                <MentoringView/>
            </section>
            <Footer/>
        </main>
    )
}
