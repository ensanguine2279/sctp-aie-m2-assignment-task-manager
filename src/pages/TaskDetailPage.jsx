import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useTask } from "../contexts/TaskContextInstance";

import TaskForm from "../components/TaskForm.jsx";

import { statusOptions, priorityOptions } from "../utils/data.js";

import styles from "./TaskDetailPage.module.css";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, updateTask } = useTask();

  const task = tasks.find((t) => String(t.id) === String(id));

  const [isEditing, setIsEditing] = useState(false);

  const [draft, setDraft] = useState(null);

  const statusLabel =
    statusOptions.find((option) => option.value === task?.status)?.label ??
    "Unknown";
  const priorityLabel =
    priorityOptions.find((option) => option.value === task?.priority)?.label ??
    "Unknown";

  const startEdit = () => {
    if (!task) return;
    setDraft({
      ...task,
      description: task.description ?? "",
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraft(null);
  };

  const saveEdit = () => {
    if (!draft || !draft.title?.trim()) return;
    updateTask({
      ...draft,
      title: draft.title.trim(),
      description: draft.description?.trim() ?? "",
    });
    setIsEditing(false);
    setDraft(null);
  };

  // Conditionally render a "Task not found" message if the task ID is invalid or cannot be found
  if (!task) {
    return (
      <div className={styles.detailContainer}>
        <Link to="/tasks" className={styles.backLink}>
          ← Back to Task List
        </Link>
        <div className={styles.errorCard}>
          <div className={styles.errorHeader}>
            <span className={styles.warningIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M12 3.8 2.8 20h18.4L12 3.8Zm0 5.3v5.4m0 3.6h.01"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2>Task not found</h2>
          </div>
          <p>
            The task with id <strong>#{id}</strong> could be missing or has been
            deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <Link to="/tasks" className={styles.backLink}>
        ← Back to Task List
      </Link>
      <div className={styles.detailCard}>
        <div className={styles.cardTopBar}>
          <div className={styles.topLeft}>
            <span className={styles.taskId}>ID #{task.id}</span>
          </div>
          <p className={styles.kicker}>Task details</p>
          <div className={styles.topActions}>
            {/* Render Edit/Save/Cancel buttons based on the isEditing state */}
            {!isEditing ? (
              <button
                type="button"
                className={styles.editButton}
                onClick={startEdit}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={saveEdit}
                  disabled={!draft?.title?.trim()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Conditionally render either the task details or the edit form based
            on the isEditing state */}
        {!isEditing ? (
          <>
            <section className={styles.contentBlock}>
              <h2 className={styles.taskTitle}>{task.title}</h2>

              <section className={styles.descriptionCard}>
                <p className={styles.detailDescLabel}>Description</p>
                <p className={styles.detailDescContent}>
                  {task.description ||
                    "No description added for this task yet."}
                </p>
              </section>
            </section>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Priority</span>
                <span
                  className={`${styles.metaValuePill} ${styles[`priority-${task.priority}`] ?? ""}`}
                >
                  {priorityLabel}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Status</span>
                <span
                  className={`${styles.metaValuePill} ${styles[`status-${task.status}`] ?? ""}`}
                >
                  {statusLabel}
                </span>
              </div>
            </div>
          </>
        ) : (
          <TaskForm draft={draft} setDraft={setDraft} />
        )}
      </div>
    </div>
  );
}
