import React from 'react'
import SectionLayout from '@/components/layout/SectionLayout'
import Footer from '@/components/footer/Footer'
import LearnEnglishView from '@/components/learnEnglish/LearnEnglishView'

export default function page() {
	return (
		<main className="flex flex-col pt-10">
			<section className="flex flex-col gap-8 md:gap-10">
				<SectionLayout>
					<h1 className="text-[var(--gold-12)] text-3xl md:text-4xl">Lewis Broadhurst</h1>
					<h2 className="text-xs md:text-sm text-[var(--gold-8)]">Native English Speaker</h2>
				</SectionLayout>
				<LearnEnglishView />
			</section>
			<Footer />
		</main>
	)
}
