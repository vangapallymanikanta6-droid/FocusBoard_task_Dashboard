export type Status = 'To do' | 'In progress' | 'Completed'
export type Priority = 'Low' | 'Medium' | 'High'
export type Task = {
  id: string
  title: string
  description: string
  category: string
  status: Status
  priority: Priority
  dueDate: string
}
export type TaskDraft = Omit<Task, 'id'>
export type Tab = 'All tasks' | Status
export type NavItem = 'Overview' | 'My tasks'
