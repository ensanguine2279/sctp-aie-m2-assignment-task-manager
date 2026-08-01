import { useTask } from "../contexts/TaskContextInstance";
import TaskRow from "./TaskRow";

import styles from "./TaskList.module.css";

function TaskList() {
  const { filteredTasks, tasks, deleteTask } = useTask();

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

  if (filteredTasks.length === 0) {
    return <p className={styles.emptyState}>No matching tasks found.</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <p className={styles.taskCount}>
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>
      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th className={styles.actionHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => {
            const statusLabel = statusLabelMap[task.status] ?? "Unknown";
            const priorityLabel = priorityLabelMap[task.priority] ?? "Unknown";

            return (
              <TaskRow
                key={task.id}
                task={task}
                statusLabel={statusLabel}
                priorityLabel={priorityLabel}
                onDelete={deleteTask}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
