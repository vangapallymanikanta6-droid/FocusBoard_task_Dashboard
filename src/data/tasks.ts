import type { Priority, Status, Tab } from '../types'

export const statuses: Status[] = ['To do', 'In progress', 'Completed']
export const priorities: Priority[] = ['Low', 'Medium', 'High']
export const tabs: Tab[] = ['All tasks', ...statuses]

function dateOffset(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function createSampleTasks() {
  return [
    {
      id: 'task-1',
      title: 'Design landing page',
      description: 'Website redesign · Due soon',
      category: 'Design',
      status: 'In progress',
      priority: 'High',
      dueDate: dateOffset(0),
    },
    {
      id: 'task-2',
      title: 'Fix mobile navigation',
      description: 'Frontend sprint · UI polish',
      category: 'Development',
      status: 'In progress',
      priority: 'Medium',
      dueDate: dateOffset(2),
    },
    {
      id: 'task-3',
      title: 'Review onboarding copy',
      description: 'Content updates · Approved',
      category: 'Content',
      status: 'Completed',
      priority: 'Low',
      dueDate: dateOffset(-4),
    },
    {
      id: 'task-4',
      title: 'Share the weekly update',
      description: 'Team highlights · Ready to send',
      category: 'Content',
      status: 'Completed',
      priority: 'Low',
      dueDate: dateOffset(-2),
    },
    {
      id: 'task-5',
      title: 'Plan the next campaign',
      description: 'Outline the launch plan with the marketing team.',
      category: 'Marketing',
      status: 'In progress',
      priority: 'Medium',
      dueDate: dateOffset(3),
    },
    {
      id: 'task-6',
      title: 'Update the product roadmap',
      description: 'Confirm milestones for the next product cycle.',
      category: 'Product',
      status: 'In progress',
      priority: 'High',
      dueDate: dateOffset(1),
    },
    {
      id: 'task-7',
      title: 'QA the checkout flow',
      description: 'Run a final pass on the purchase experience.',
      category: 'Development',
      status: 'In progress',
      priority: 'High',
      dueDate: dateOffset(5),
    },
    {
      id: 'task-8',
      title: 'Organize the component library',
      description: 'Group shared patterns and archive old explorations.',
      category: 'Design',
      status: 'Completed',
      priority: 'Medium',
      dueDate: dateOffset(-1),
    },
    {
      id: 'task-9',
      title: 'Draft release notes',
      description: 'Summarize the latest product improvements.',
      category: 'Content',
      status: 'Completed',
      priority: 'Low',
      dueDate: dateOffset(2),
    },
    {
      id: 'task-10',
      title: 'Audit accessibility',
      description: 'Check keyboard support and accessible labels.',
      category: 'Design',
      status: 'Completed',
      priority: 'High',
      dueDate: dateOffset(4),
    },
    {
      id: 'task-11',
      title: 'Prepare sprint demo',
      description: 'Capture the completed work and share a demo outline.',
      category: 'Planning',
      status: 'Completed',
      priority: 'Medium',
      dueDate: dateOffset(-1),
    },
    {
      id: 'task-12',
      title: 'Review product analytics',
      description: 'Share the weekly engagement summary.',
      category: 'Product',
      status: 'Completed',
      priority: 'Low',
      dueDate: dateOffset(1),
    },
  ] satisfies Array<{
    id: string
    title: string
    description: string
    category: string
    status: Status
    priority: Priority
    dueDate: string
  }>
}

export const focusNotes = [
  {
    title: 'Make today count.',
    description: 'A little focus goes a long way.',
    taskStatus: 'NEXT UP',
    taskTitle: 'Design landing page',
    progress: 62,
    accent: '01',
  },
  {
    title: 'Small steps, big progress.',
    description: 'Keep your priorities in view.',
    taskStatus: 'IN PROGRESS',
    taskTitle: 'Fix navigation',
    progress: 67,
    accent: '02',
  },
  {
    title: 'Celebrate the wins.',
    description: 'Every completed task moves you forward.',
    taskStatus: 'COMPLETED',
    taskTitle: 'Onboarding copy',
    progress: 100,
    accent: '03',
  },
]
