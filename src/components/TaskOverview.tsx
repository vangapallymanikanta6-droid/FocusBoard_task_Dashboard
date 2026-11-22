import type { Task } from '../types'
import { Icon } from './Icon'

export function TaskOverview({ tasks }: { tasks: Task[] }) {
  const total = tasks.length
  const inProgressCount = tasks.filter((task) => task.status === 'In progress').length
  const completedCount = tasks.filter((task) => task.status === 'Completed').length
  const completion = total === 0 ? 0 : Math.round((completedCount / total) * 100)

  return (
    <section className="stats-grid" aria-label="Task overview">
      <article className="stat-card">
        <div className="stat-card-top"><span className="stat-icon violet"><Icon name="board" /></span><span>Total tasks</span></div>
        <div className="stat-value">{total}</div>
        <p className="stat-foot"><span className="stat-foot-icon"><Icon name="trend" size={15} /></span> In your workspace</p>
      </article>
      <article className="stat-card">
        <div className="stat-card-top"><span className="stat-icon blue"><Icon name="clock" /></span><span>In progress</span></div>
        <div className="stat-value">{inProgressCount}</div>
        <p className="stat-foot">Keep the momentum going</p>
      </article>
      <article className="stat-card">
        <div className="stat-card-top"><span className="stat-icon green"><Icon name="check" /></span><span>Completed</span></div>
        <div className="stat-value">{completedCount}</div>
        <p className="stat-foot">{completion}% completion rate</p>
      </article>
    </section>
  )
}
