import { Link } from "react-router-dom";

import styles from "./TaskRow.module.css";

function TaskRow({ task, statusLabel, priorityLabel, onDelete }) {
  return (
    <tr>
      <td className={styles.titleCell}>
        <Link to={`/tasks/${task.id}`} className={styles.titleLink}>
          {task.title}
        </Link>
      </td>
      <td>
        <span
          className={`${styles.badge} ${styles[`status-${task.status}`] ?? ""}`}
        >
          {statusLabel}
        </span>
      </td>
      <td>
        <span
          className={`${styles.badge} ${styles[`priority-${task.priority}`] ?? ""}`}
        >
          {priorityLabel}
        </span>
      </td>
      <td className={styles.actionCell}>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task: ${task.title}`}
          title="Delete task"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              d="M9 3h6m-9 4h12m-1 0-0.7 11.2a2 2 0 0 1-2 1.8H9.7a2 2 0 0 1-2-1.8L7 7m3 4v6m4-6v6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default TaskRow;
