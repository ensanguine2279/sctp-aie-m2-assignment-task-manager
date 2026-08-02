import { useTask } from "../contexts/TaskContextInstance";

import TaskRow from "./TaskRow";

import { getStatusLabel, getPriorityLabel } from "../utils/data.js";

import styles from "./TaskList.module.css";

function TaskList() {
  const { filteredTasks, tasks, deleteTask } = useTask();

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
            <th>Priority</th>
            <th>Status</th>

            <th className={styles.actionHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => {
            const statusLabel = getStatusLabel(task.status);
            const priorityLabel = getPriorityLabel(task.priority);

            return (
              <TaskRow
                key={task.id}
                task={task}
                index={index}
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
