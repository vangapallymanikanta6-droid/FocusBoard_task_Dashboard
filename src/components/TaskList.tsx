import { useMemo, useState } from 'react'
import { priorities, tabs, statuses } from '../data/tasks'
import type { Priority, Status, Tab, Task } from '../types'
import { formatDueDate } from '../utils/tasks'
import { Icon } from './Icon'

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  onViewAll,
  onCreateTask,
}: {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onStatusChange: (taskId: string, status: Status) => void
  onViewAll: () => void
  onCreateTask: () => void
}) {
  const [activeTab, setActiveTab] = useState<Tab>('All tasks')
  const [priorityFilter, setPriorityFilter] = useState<'All priorities' | Priority>('All priorities')
  const [search, setSearch] = useState('')
  const [openTaskMenuId, setOpenTaskMenuId] = useState<string | null>(null)

  const visibleTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()
    return tasks.filter((task) => {
      const matchesTab = activeTab === 'All tasks' || task.status === activeTab
      const matchesPriority = priorityFilter === 'All priorities' || task.priority === priorityFilter
      const matchesSearch = task.title.toLocaleLowerCase().includes(normalizedSearch)
      return matchesTab && matchesPriority && matchesSearch
    })
  }, [activeTab, priorityFilter, search, tasks])

  function clearFilters() {
    setSearch('')
    setActiveTab('All tasks')
    setPriorityFilter('All priorities')
  }

  return (
    <section className="tasks-section" id="tasks">
      <div className="section-heading">
        <div>
          <h2>My tasks</h2>
          <p className="section-copy">Manage and track everything in one place.</p>
        </div>
        <button className="text-button" type="button" onClick={onViewAll}>View all tasks <span aria-hidden="true">→</span></button>
        <button
          className="button button-primary mobile-new-task"
          type="button"
          aria-label="Create new task"
          onClick={onCreateTask}
        ><Icon name="plus" size={21} /></button>
      </div>

      <div className="task-toolbar">
        <div className="tabs" role="tablist" aria-label="Filter tasks by status">
          {tabs.map((tab) => (
            <button
              type="button"
              role="tab"
              key={tab}
              aria-selected={activeTab === tab}
              className={activeTab === tab ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(tab)}
            >{tab === 'All tasks' ? `All tasks ${tasks.length}` : tab}</button>
          ))}
        </div>
        <div className="task-tools">
          <label className="search-field">
            <Icon name="search" size={18} />
            <span className="visually-hidden">Search tasks by title</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks..." />
          </label>
          <label className="priority-filter">
            <span className="visually-hidden">Filter by priority</span>
            <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value as 'All priorities' | Priority)}>
              <option>All priorities</option>
              {priorities.map((priority) => <option key={priority}>{priority}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="task-list">
        <div className="task-list-head" aria-hidden="true">
          <span>Task</span><span>Category</span><span>Priority</span><span>Due date</span><span />
        </div>
        {visibleTasks.length > 0 ? visibleTasks.map((task) => (
          <article className="task-row" key={task.id}>
            <div className="task-name">
              <span className={`task-check ${task.status === 'Completed' ? 'checked' : task.status === 'In progress' ? 'in-progress' : ''}`} aria-hidden="true">
                {task.status === 'Completed' && <Icon name="check" size={14} />}
              </span>
              <div><h3>{task.title}</h3><p>{task.description || 'No description added'}</p></div>
            </div>
            <div className="task-meta">
              <div className="task-category"><span className="category-pill">{task.category}</span></div>
              <div className="task-priority"><span className={`priority-pill ${task.priority.toLowerCase()}`}><i />{task.priority}</span></div>
              <div className="task-due"><span><Icon name="calendar" size={15} />{formatDueDate(task.dueDate)}</span></div>
            </div>
            <div className="task-actions">
              <button
                type="button"
                className="icon-button more-button"
                aria-label={`More actions for ${task.title}`}
                aria-expanded={openTaskMenuId === task.id}
                onClick={() => setOpenTaskMenuId(openTaskMenuId === task.id ? null : task.id)}
              ><Icon name="more" size={19} /></button>
              {openTaskMenuId === task.id && (
                <div className="task-menu" role="group" aria-label={`${task.title} actions`}>
                  <button type="button" onClick={() => {
                    onEdit(task)
                    setOpenTaskMenuId(null)
                  }}>Edit task</button>
                  <label>
                    <span>Status</span>
                    <select
                      value={task.status}
                      onChange={(event) => {
                        onStatusChange(task.id, event.target.value as Status)
                        setOpenTaskMenuId(null)
                      }}
                      aria-label={`Status for ${task.title}`}
                    >
                      {statuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </label>
                  <button type="button" className="menu-delete" onClick={() => {
                    setOpenTaskMenuId(null)
                    onDelete(task)
                  }}>Delete task</button>
                </div>
              )}
            </div>
          </article>
        )) : (
          <div className="empty-state">
            <span className="empty-icon"><Icon name="search" size={22} /></span>
            <h3>No tasks found</h3>
            <p>Try changing your search or filters to find what you’re looking for.</p>
            <button className="text-button" onClick={clearFilters}>Clear filters</button>
          </div>
        )}
      </div>
    </section>
  )
}
