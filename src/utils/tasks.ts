import { createSampleTasks, priorities, statuses } from '../data/tasks'
import type { Priority, Status, Task } from '../types'

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false
  const task = value as Record<string, unknown>
  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    typeof task.category === 'string' &&
    statuses.includes(task.status as Status) &&
    priorities.includes(task.priority as Priority) &&
    typeof task.dueDate === 'string'
  )
}

export function loadTasks(): { tasks: Task[]; warning: string } {
  try {
    const saved = window.localStorage.getItem('focusboard.tasks')
    if (saved === null) return { tasks: createSampleTasks(), warning: '' }
    const parsed: unknown = JSON.parse(saved)
    if (Array.isArray(parsed) && parsed.every(isTask)) {
      return { tasks: parsed, warning: '' }
    }
    throw new Error('Saved task data has an unexpected format.')
  } catch (error) {
    console.error('Unable to restore FocusBoard tasks:', error)
    return {
      tasks: createSampleTasks(),
      warning: 'Saved tasks could not be loaded. Your current session is still available.',
    }
  }
}

export function formatDueDate(value: string) {
  if (!value) return 'No date'
  const date = new Date(`${value}T12:00:00`)
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  if (isSameDay(date, today)) return 'Today'
  if (isSameDay(date, tomorrow)) return 'Tomorrow'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date)
}
