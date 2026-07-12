import TabbedPage from '@/components/layout/TabbedPage'
import {NavigationTabs} from '@/components/global/Navigation'

export default function page() {
    return <TabbedPage defaultTab={NavigationTabs.MENTORING}/>
}
