import { useState, type FormEvent } from 'react'
import { priorities, statuses } from '../data/tasks'
import type { Priority, Status, Task, TaskDraft } from '../types'
import { Icon } from './Icon'

export function TaskForm({
  task,
  onClose,
  onSave,
}: {
  task: Task | null
  onClose: () => void
  onSave: (draft: TaskDraft) => void
}) {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [status, setStatus] = useState<Status>(task?.status ?? 'To do')
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'Medium')
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim()) {
      setError('Add a task title before saving.')
      return
    }
    onSave({
      title: title.trim(),
      description: description.trim(),
      category: task?.category ?? 'General',
      status,
      priority,
      dueDate,
    })
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
    >
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <div className="modal-heading">
          <div>
            <h2 id="task-form-title">{task ? 'Edit task' : 'Create new task'}</h2>
            <p className="modal-description">
              {task ? 'Update your task details.' : 'Add your task details to stay on top of your work.'}
            </p>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close form">
            <Icon name="close" />
          </button>
        </div>
        <form className="task-form" onSubmit={handleSubmit} noValidate>
          <label className="field full-field">
            <span>Task title <span className="required">*</span></span>
            <input
              autoFocus
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
                if (error) setError('')
              }}
              placeholder="What needs to get done?"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'title-error' : undefined}
            />
            {error && <span className="field-error" id="title-error">{error}</span>}
          </label>
          <label className="field full-field">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a few details..."
              rows={3}
            />
          </label>
          <label className="field">
            <span>Status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as Status)}>
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Priority</span>
            <select value={priority} onChange={(event) => setPriority(event.target.value as Priority)}>
              {priorities.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="field full-field">
            <span>Due date</span>
            <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
          </label>
          <p className="required-note full-field"><span>*</span> Required field</p>
          <div className="form-actions full-field">
            <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">
              <Icon name={task ? 'check' : 'plus'} size={17} />
              {task ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
