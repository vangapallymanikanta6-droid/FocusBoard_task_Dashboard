import { useState } from 'react'
import { focusNotes } from '../data/tasks'
import { Icon } from './Icon'

export function FocusNotes() {
  const [activeNote, setActiveNote] = useState(0)
  const activeFocusNote = focusNotes[activeNote]

  return (
    <section className="focus-note" id="focus-notes" aria-label="Focus notes">
      <div className="note-content" aria-live="polite">
        <p className="eyebrow desktop-note-label">FOCUS NOTES <span>{activeFocusNote.accent} / 03</span></p>
        <p className="eyebrow mobile-note-label">GOOD AFTERNOON</p>
        <h2>{activeFocusNote.title}</h2>
        <p>{activeFocusNote.description}</p>
        <div className="mobile-note-progress">
          <span className="mobile-progress-track"><i style={{ width: `${activeFocusNote.progress}%` }} /></span>
          <span>{activeFocusNote.progress}%</span>
        </div>
      </div>
      <div className="note-task-card" aria-label={`${activeFocusNote.taskStatus}: ${activeFocusNote.taskTitle}`}>
        <span className="note-task-check"><Icon name="check" size={13} /></span>
        <div className="note-task-copy">
          <span>{activeFocusNote.taskStatus}</span>
          <strong>{activeFocusNote.taskTitle}</strong>
          <i><b style={{ width: `${activeFocusNote.progress}%` }} /></i>
        </div>
        <strong className="note-task-progress">{activeFocusNote.progress}%</strong>
      </div>
      <div className="note-controls">
        <div className="note-arrows">
          <button
            type="button"
            className="note-arrow"
            aria-label="Previous focus note"
            onClick={() => setActiveNote((activeNote + focusNotes.length - 1) % focusNotes.length)}
          ><Icon name="arrow-left" size={18} /></button>
          <button
            type="button"
            className="note-arrow"
            aria-label="Next focus note"
            onClick={() => setActiveNote((activeNote + 1) % focusNotes.length)}
          ><Icon name="arrow-right" size={18} /></button>
        </div>
        <div className="note-dots" aria-label="Focus note slide">
          {focusNotes.map((note, index) => (
            <button
              type="button"
              key={note.accent}
              aria-label={`Show focus note ${index + 1}`}
              aria-current={index === activeNote ? 'true' : undefined}
              className={index === activeNote ? 'note-dot active' : 'note-dot'}
              onClick={() => setActiveNote(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
