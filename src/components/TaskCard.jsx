import styles from "./TaskCard.module.css";

function TaskCard({ task, onToggle, onDelete, onSelect }) {
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

  // Default to "Unknown" if the task's status or priority is not recognized
  const statusLabel = statusLabelMap[task.status] ?? "Unknown";
  const priorityLabel = priorityLabelMap[task.priority] ?? "Unknown";

  const isCompleted = task.status === "done" || task.completed;

  return (
    <div
      className={styles.taskCard}
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(task.id)}
      // Better accessibility and usability for keyboard + assistive technology users.
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(task.id);
        }
      }}
      // The aria-label prop gives an accessible name to an element, mainly for screen readers.
      // It does not change visual UI, it improves how controls are announced and understood by assistive tools.
      aria-label={`Open details for task: ${task.title}`}
    >
      <input
        type="checkbox"
        className={styles.taskCheck}
        checked={isCompleted}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => {
          event.stopPropagation();
          onToggle?.(task.id);
        }}
        aria-label={`Mark task "${task.title}" as completed`}
      />

      <h3
        className={`${styles.taskTitle} ${isCompleted ? styles.completed : ""}`}
      >
        {task.title}
      </h3>

      <div className={styles.rightControls}>
        <div className={styles.metaGroup}>
          <span
            className={`${styles.statusBadge} ${styles[`status-${task.status}`] ?? ""}`}
            aria-label={`Status: ${statusLabel}`}
            title={`Status: ${statusLabel}`}
          >
            {statusLabel}
          </span>

          <span
            className={`${styles.priorityBadge} ${styles[`priority-${task.priority}`] ?? ""}`}
            aria-label={`Priority: ${priorityLabel}`}
            title={`Priority: ${priorityLabel}`}
          >
            {priorityLabel}
          </span>
        </div>

        <div className={styles.actions}>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onDelete?.(task.id);
            }}
            className={styles.deleteButton}
            aria-label="Delete task"
            title="Delete task"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M9 3h6m-9 4h12m-1 0-0.7 11.2a2 2 0 0 1-2 1.8H9.7a2 2 0 0 1-2-1.8L7 7m3 4v6m4-6v6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.srOnly}>Delete task</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
