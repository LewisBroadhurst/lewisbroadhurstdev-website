'use client'
import React from 'react'
import { Button } from '@radix-ui/themes'
import SectionLayout from '@/components/layout/SectionLayout'

export default function LearnEnglishView() {
	return (
		<section className="flex flex-col">
			<SectionLayout className="flex items-center">
				<section className="flex flex-col gap-8 py-10 sm:gap-16 sm:py-20 md:py-40">
					<section className="flex flex-col gap-2 sm:w-2/3 md:w-4/5 lg:w-2/3">
						<h2 className="text-xl md:text-5xl">Advanced English lessons for B1+ English Speakers</h2>
						<p className="text-sm md:text-base text-[var(--gold-8)]"></p>
					</section>

					<div className="flex flex-row items-center gap-4">
						<Button
							size={{ initial: '3', xs: '4' }}
							className="hover:cursor-pointer"
							onClick={() => window.open('https://calendly.com/lewis1broadhurst/15min', '_blank')}
						>
							Book an Intro call
						</Button>
					</div>
				</section>
			</SectionLayout>
		</section>
	)
}
