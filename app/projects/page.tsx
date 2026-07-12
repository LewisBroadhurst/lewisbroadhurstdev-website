import TabbedPage from '@/components/layout/TabbedPage';
import ProjectView from '@/components/projects/ProjectsView';

export default function page() {
	return (
		<TabbedPage>
			<ProjectView />
		</TabbedPage>
	);
}
