import { useTask } from "../contexts/TaskContextInstance";

import { statusOptions, priorityOptions } from "../utils/data.js";

import styles from "./TaskFilters.module.css";

export function TaskFilters() {
  const {
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    resetFilters,
  } = useTask();

  // Check if any filter is currently active
  const hasActiveFilters = statusFilter !== "all" || priorityFilter !== "all";

  return (
    <div className={styles.filtersContainer}>
      {/* Priority Filter */}
      <div className={styles.filterGroup}>
        <label htmlFor="priority-filter">Filter by Priority:</label>
        <select
          id="priority-filter"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div className={styles.filterGroup}>
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button (conditionally rendered only when filters are active) */}
      {hasActiveFilters && (
        <div className={styles.filterAction}>
          <button
            type="button"
            onClick={resetFilters}
            className={styles.clearButton}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskFilters;
