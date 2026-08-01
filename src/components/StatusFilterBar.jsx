import { useTask } from "../contexts/TaskContextInstance";

import styles from "./StatusFilterBar.module.css";

function StatusFilterBar() {
  const { statusFilter, setStatusFilter } = useTask();
  const options = [
    { value: "all", label: "All Tasks" },
    { value: "todo", label: "To Do" },
    { value: "in-progress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  return (
    <div className={styles.filterBar}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setStatusFilter(opt.value)}
          className={`${styles.filterBtn} ${statusFilter === opt.value ? styles.active : ""}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default StatusFilterBar;
