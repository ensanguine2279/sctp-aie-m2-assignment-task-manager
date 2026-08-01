import { useParams, Link } from "react-router-dom";
import { useTask } from "../contexts/TaskContextInstance";

import styles from "./TaskDetailPage.module.css";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks } = useTask();
  const task = tasks.find((t) => String(t.id) === String(id));

  const statusLabelMap = {
    todo: "To do",
    "in-progress": "In progress",
    done: "Done",
  };

  const priorityLabelMap = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  const statusLabel = statusLabelMap[task?.status] ?? "Unknown";
  const priorityLabel = priorityLabelMap[task?.priority] ?? "Unknown";

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
          <p className={styles.kicker}>Task details</p>
          <span className={styles.taskId}>ID #{task.id}</span>
        </div>

        <section className={styles.contentBlock}>
          <h2 className={styles.taskTitle}>{task.title}</h2>

          <section className={styles.descriptionCard}>
            <p className={styles.detailDescLabel}>Description</p>
            <p className={styles.detailDescContent}>
              {task.description || "No description added for this task yet."}
            </p>
          </section>
        </section>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Status</span>
            <span
              className={`${styles.metaValuePill} ${styles[`status-${task.status}`] ?? ""}`}
            >
              {statusLabel}
            </span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Priority</span>
            <span
              className={`${styles.metaValuePill} ${styles[`priority-${task.priority}`] ?? ""}`}
            >
              {priorityLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
