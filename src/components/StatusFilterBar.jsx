import { useTask } from "../contexts/TaskContextInstance";

import { statusOptions as options } from "../utils/data.js";

import styles from "./StatusFilterBar.module.css";

function StatusFilterBar() {
  const { statusFilter, setStatusFilter } = useTask();

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
