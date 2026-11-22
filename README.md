<<<<<<< HEAD
# FocusBoard

A responsive, single-user task dashboard built with React, TypeScript, and Vite. Tasks can be created, edited, deleted, searched, filtered, and updated without a backend.

## Run locally

```bash
npm install
npm run dev
```

The app is served at the local URL printed by Vite. Use `npm run build` to type-check and create a production build, and `npm run lint` to run ESLint.

## Implementation

- React hooks are the single source of truth for task data. Task counts, completion percentage, and filtered results are derived from that state, so edits immediately update the dashboard.
- Task data is restored from and saved to `localStorage` under `focusboard.tasks`. Sample tasks are used only when there is no saved task list.
- The task form supports create and edit, validates the required title, and includes description, status, priority, and due date fields. Deletion requires confirmation.
- Status tabs, title search, and the priority selector work together. The Focus Notes carousel has three manually navigable slides.
- Layout styles adapt for desktop, tablet, and mobile breakpoints. Controls use semantic elements, visible focus states, and accessible names.
- Desktop and mobile captures are in [`screenshots/`](./screenshots/).

## Design and limitations

The supplied Figma link required access unavailable in this environment. The UI was updated to follow the reference screenshots supplied with the assignment; exact pixel matching against the live Figma file could not be verified.

Calendar and Settings navigation items are visual placeholders. This is a single-user frontend and does not provide authentication, cloud sync, calendar integration, or a backend.

## Submission

- Hosted URL: Not deployed.
- Public GitHub repository: Not created.
- Desktop screenshot: [`screenshots/desktop.png`](./screenshots/desktop.png).
- Mobile screenshot: [`screenshots/mobile.png`](./screenshots/mobile.png).
- Task form screenshot: [`screenshots/task-form.png`](./screenshots/task-form.png).

## AI assistance

See [AI_USAGE.md](./AI_USAGE.md) for tool disclosure, representative prompts, and a reviewed design decision.
=======
# FocusBoard_task_Dashboard
FocusBoard is a responsive task-management dashboard built with React and Vite. It helps users organize tasks, track progress, filter priorities, and monitor productivity from desktop or mobile devices.
>>>>>>> 7038c3122c48849fc6ac64cf686acd2567ff492d
