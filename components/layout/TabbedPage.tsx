import React from 'react';
import Header from '@/components/global/Header';
import Navigation from '@/components/global/Navigation';
import SectionLayout from '@/components/layout/SectionLayout';
import Footer from '@/components/footer/Footer';

type Props = {
	children: React.ReactNode;
};

const TabbedPage = ({ children }: Props) => {
	return (
		<main className="flex flex-col pt-10">
			<section className="flex flex-col gap-8 md:gap-10">
				<SectionLayout>
					<section className="flex flex-col gap-2 md:justify-between md:flex-row">
						<Header />
						<Navigation />
					</section>
				</SectionLayout>
				{children}
			</section>
			<Footer />
		</main>
	);
};

export default TabbedPage;
