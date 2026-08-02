import { useState } from "react";

import { useTask } from "../contexts/TaskContextInstance";

import TaskForm from "./TaskForm";

import styles from "./AddTaskForm.module.css";

export default function AddTaskForm() {
  const { addTask } = useTask();
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  // Check if any required field is empty or just whitespace
  const isFormInvalid = !draft.title.trim() || !draft.description.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) return;

    addTask({
      // Spread the draft form state to create a new task object to prevent mutation of the original form state
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
      // Generate a unique ID for the new task using the current timestamp
      id: Date.now(),
    });

    setDraft({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addTaskForm}>
      <h3>Add New Task</h3>
      <TaskForm draft={draft} setDraft={setDraft} mode="create" />

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isFormInvalid}
      >
        Create Task
      </button>
    </form>
  );
}
