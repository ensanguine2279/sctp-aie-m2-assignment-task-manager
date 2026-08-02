# Task Manager (React + Vite)

Simple task management app built with React, Context API, and reducer-based state management.

## How To Install And Run

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run in development mode

```bash
npm run dev
```

Open the app at the local URL shown in your terminal (i.e. `http://127.0.0.1:5173` or similar).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Screenshot (Main Features)

Main features shown: status filters, task table (Title/Status/Priority), delete actions, and add-task form.

![Task Manager main features](public/screenshots/main-features.png)

## Bonus Challenges Completed

### Easy

- Show a task count summary above the list: "Showing X of Y tasks"
- Disable the Add Task form's submit button while any required field is empty

### Medium

- Persist tasks in `localStorage` so they survive a page reload (use a lazy `useState` initialiser or
  `useEffect` in `TaskContext`)
- Add an `UPDATE_TASK` action and an inline edit form on the detail page

### Hard

- Add drag-and-drop reordering of tasks in the list using only browser drag events (no library)
- Add a priority filter on top of the status filter, so both can be active at the same time
