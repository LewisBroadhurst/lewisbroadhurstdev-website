import Link from 'next/link';

import { Button } from '@big-shared/ui/button';
import { Container, Label } from '@/components/ui';

export default function NotFound() {
	return (
		<Container className="flex flex-col items-start gap-4 pt-24">
			<Label>404</Label>
			<h1 className="text-4xl font-semibold tracking-tight text-foreground">Nothing here</h1>
			<p className="text-subtle-foreground">That page has moved or never existed.</p>
			<Button asChild size="lg" variant="default">
				<Link href="/">Back to the home page</Link>
			</Button>
		</Container>
	);
}
