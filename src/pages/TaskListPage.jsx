import StatusFilterBar from "../components/StatusFilterBar";

import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";

import styles from "./TaskListPage.module.css";

export default function TaskListPage() {
  return (
    <div className={styles.taskPageLayout}>
      <div>
        <StatusFilterBar />
        <TaskList />
      </div>
      <aside>
        <AddTaskForm />
      </aside>
    </div>
  );
}
