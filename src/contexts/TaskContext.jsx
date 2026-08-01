import { useReducer } from "react";

import PropTypes from "prop-types";

import { TaskContext } from "./TaskContextInstance";
import { taskReducer, initialTaskState } from "../reducers/taskReducer";

// TaskProvider component to wrap the application and provide task state and dispatch function
export function TaskProvider({ children }) {
  // Use useReducer to manage task state and dispatch actions
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const { tasks, statusFilter, priorityFilter } = state;

  // Helper dispatch wrappers passed down via context
  const addTask = (task) => dispatch({ type: "ADD_TASK", payload: task });

  const deleteTask = (id) => dispatch({ type: "DELETE_TASK", payload: id });

  const setStatusFilter = (filterValue) =>
    dispatch({ type: "SET_STATUS_FILTER", payload: filterValue });

  const setPriorityFilter = (filterValue) =>
    dispatch({ type: "SET_PRIORITY_FILTER", payload: filterValue });

  // Filter tasks based on status and priority filters
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "all") {
      if (priorityFilter === "all") return true;
      return task.priority === priorityFilter;
    }
    if (priorityFilter === "all") return task.status === statusFilter;
    return task.status === statusFilter && task.priority === priorityFilter;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        statusFilter,
        priorityFilter,

        addTask,
        deleteTask,
        setStatusFilter,
        setPriorityFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
