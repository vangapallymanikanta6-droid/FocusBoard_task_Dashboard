import type { NavItem } from '../types'
import { Icon } from './Icon'

function Brand() {
  return (
    <>
      <span className="brand-mark"><Icon name="board" size={21} /></span>
      <span>FocusBoard</span>
    </>
  )
}

function ProfileAvatar() {
  return <span className="top-avatar" aria-label="Profile: Jamie Doe">JD</span>
}

export function MobileHeader({ onNavigate }: { onNavigate: (item: NavItem) => void }) {
  return (
    <header className="mobile-header">
      <a className="brand" href="#overview" onClick={() => onNavigate('Overview')}>
        <Brand />
      </a>
      <ProfileAvatar />
    </header>
  )
}

export function DesktopSidebar({
  activeNav,
  total,
  onNavigate,
}: {
  activeNav: NavItem
  total: number
  onNavigate: (item: NavItem) => void
}) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#overview" onClick={() => onNavigate('Overview')}>
        <Brand />
      </a>
      <p className="nav-label">WORKSPACE</p>
      <nav className="side-nav" aria-label="Main navigation">
        <a
          href="#overview"
          className={activeNav === 'Overview' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('Overview')}
        >
          <Icon name="overview" /><span>Overview</span>
        </a>
        <a
          href="#tasks"
          className={activeNav === 'My tasks' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('My tasks')}
        >
          <Icon name="tasks" /><span>My tasks</span><span className="nav-count">{total}</span>
        </a>
        <button className="nav-link" type="button" disabled title="Calendar is a visual placeholder">
          <Icon name="calendar" /><span>Calendar</span>
        </button>
        <button className="nav-link" type="button" disabled title="Settings is a visual placeholder">
          <Icon name="settings" /><span>Settings</span>
        </button>
      </nav>
    </aside>
  )
}

export function MobileBottomNav({
  activeNav,
  onNavigate,
}: {
  activeNav: NavItem
  onNavigate: (item: NavItem) => void
}) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <a
        href="#overview"
        className={activeNav === 'Overview' ? 'mobile-nav-link active' : 'mobile-nav-link'}
        onClick={() => onNavigate('Overview')}
      ><Icon name="overview" /><span>Overview</span></a>
      <a
        href="#tasks"
        className={activeNav === 'My tasks' ? 'mobile-nav-link active' : 'mobile-nav-link'}
        onClick={() => onNavigate('My tasks')}
      ><Icon name="tasks" /><span>Tasks</span></a>
      <button type="button" className="mobile-nav-link" disabled title="Calendar is a visual placeholder">
        <Icon name="calendar" /><span>Calendar</span>
      </button>
      <button type="button" className="mobile-nav-link" disabled title="Settings is a visual placeholder">
        <Icon name="settings" /><span>Settings</span>
      </button>
    </nav>
  )
}
