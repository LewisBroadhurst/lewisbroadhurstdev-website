"use client"
import React, {useState} from 'react'
import Header from '@/components/global/Header'
import Navigation, {NavigationTabs} from '@/components/global/Navigation'
import ProjectView from '@/components/projects/ProjectsView'
import BlogView from '@/components/blog/BlogView'
import CVView from "@/components/home/CVView";
import MentoringView from "@/components/mentoring/MentoringView";
import SectionLayout from "@/components/layout/SectionLayout";
import Footer from "@/components/footer/Footer";

export default function page() {

    const [activeTabKey, setActiveTabKey] = useState<string>(NavigationTabs.MENTORING)
    const handleTabChange = (e: any) => setActiveTabKey(e.target.id)

    return (
        <main className="flex flex-col pt-10">
            <section className="flex flex-col gap-8 lg:gap-10">
                <SectionLayout>
                    <section className="flex flex-col gap-2 lg:justify-between lg:flex-row">
                        <Header/>
                        <Navigation activeTabKey={activeTabKey} handleTabChange={handleTabChange}/>
                    </section>
                </SectionLayout>
                {
                    (activeTabKey === NavigationTabs.MENTORING && <MentoringView/>) ||
                    (activeTabKey === NavigationTabs.CV && <CVView/>) ||
                    (activeTabKey === NavigationTabs.BLOG && <BlogView/>) ||
                    (activeTabKey === NavigationTabs.PROJECTS && <ProjectView/>)
                }
            </section>
            <Footer/>
        </main>
    )
}
