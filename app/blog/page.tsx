import TabbedPage from '@/components/layout/TabbedPage';
import BlogView from '@/components/blog/BlogView';

export default function page() {
	return (
		<TabbedPage>
			<BlogView />
		</TabbedPage>
	);
}
