import { useState } from 'react'
import './App.css'
import { FocusNotes } from './components/FocusNotes'
import { Icon } from './components/Icon'
import { DesktopSidebar, MobileBottomNav, MobileHeader } from './components/Navigation'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { TaskOverview } from './components/TaskOverview'
import { loadTasks } from './utils/tasks'
import type { NavItem, Task, TaskDraft } from './types'

function App() {
  const [storedTasks] = useState(loadTasks)
  const [tasks, setTasks] = useState(storedTasks.tasks)
  const [storageWarning, setStorageWarning] = useState(storedTasks.warning)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [activeNav, setActiveNav] = useState<NavItem>('Overview')

  function commitTasks(update: (current: Task[]) => Task[]) {
    const nextTasks = update(tasks)
    setTasks(nextTasks)
    try {
      window.localStorage.setItem('focusboard.tasks', JSON.stringify(nextTasks))
      setStorageWarning('')
    } catch (error) {
      console.error('Unable to save FocusBoard tasks:', error)
      setStorageWarning('Changes are not being saved on this device. Check your browser storage settings.')
    }
  }

  function saveTask(draft: TaskDraft) {
    if (editingTask) {
      commitTasks((current) => current.map((task) =>
        task.id === editingTask.id ? { ...draft, id: task.id } : task,
      ))
    } else {
      commitTasks((current) => [{ ...draft, id: crypto.randomUUID() }, ...current])
    }
    setEditingTask(null)
    setIsCreatingTask(false)
  }

  function deleteTask(task: Task) {
    if (window.confirm(`Delete “${task.title}”? This cannot be undone.`)) {
      commitTasks((current) => current.filter((item) => item.id !== task.id))
    }
  }

  function updateStatus(taskId: string, status: Task['status']) {
    commitTasks((current) => current.map((task) => task.id === taskId ? { ...task, status } : task))
  }

  function viewAllTasks() {
    setActiveNav('My tasks')
    document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="dashboard-shell">
      <DesktopSidebar activeNav={activeNav} total={tasks.length} onNavigate={setActiveNav} />

      <main className="main-content" id="overview">
        <MobileHeader onNavigate={setActiveNav} />
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{activeNav}</strong></div>
          <span className="top-avatar" aria-label="Profile: Jamie Doe">JD</span>
        </header>

        <section className="page-intro">
          <div>
            <h1>Your work, in focus.</h1>
            <p className="intro-copy">Plan your day, stay organized, and celebrate small wins.</p>
          </div>
          <button className="button button-primary new-task-button desktop-new-task" onClick={() => setIsCreatingTask(true)}>
            <Icon name="plus" size={18} /> New task
          </button>
        </section>

        {storageWarning && <p className="storage-warning" role="status">{storageWarning}</p>}

        <FocusNotes />
        <h2 className="mobile-overview-label">Overview</h2>
        <TaskOverview tasks={tasks} />
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          onStatusChange={updateStatus}
          onViewAll={viewAllTasks}
          onCreateTask={() => setIsCreatingTask(true)}
        />
        <footer className="page-footer">Made for a more focused day <span aria-hidden="true">✦</span></footer>
      </main>

      <MobileBottomNav activeNav={activeNav} onNavigate={setActiveNav} />

      {(isCreatingTask || editingTask) && (
        <TaskForm
          key={editingTask?.id ?? 'new'}
          task={editingTask}
          onClose={() => {
            setIsCreatingTask(false)
            setEditingTask(null)
          }}
          onSave={saveTask}
        />
      )}
    </div>
  )
}

export default App
