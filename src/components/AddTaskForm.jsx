import { useState } from "react";

import { useTask } from "../contexts/TaskContextInstance";

import styles from "./AddTaskForm.module.css";

export default function AddTaskForm() {
  const { addTask } = useTask();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  const handleChange = (e) => {
    // Update the form state based on the input field's name and value
    // Destructuring the event target to get the name and value of the input field
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Check if any required field is empty or just whitespace
  const isFormInvalid = !form.title.trim() || !form.description.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    addTask({
      // Spread the current form state to create a new task object to prevent mutation of the original form state
      ...form,
      // Generate a unique ID for the new task using the current timestamp
      id: Date.now(),
    });

    setForm({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addTaskForm}>
      <h3>Add New Task</h3>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

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
