import { useReducer, useEffect } from "react";

import PropTypes from "prop-types";

import { TaskContext } from "./TaskContextInstance";
import { taskReducer, initialTaskState } from "../reducers/taskReducer";

import { STORAGE_KEY } from "../utils/data.js";

// TaskProvider component to wrap the application and provide task state and dispatch function
export function TaskProvider({ children }) {
  // Use useReducer to manage task state and dispatch actions
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const { tasks, statusFilter, priorityFilter } = state;

  // Persist to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  // Helper dispatch wrappers passed down via context
  const addTask = (task) => dispatch({ type: "ADD_TASK", payload: task });

  const updateTask = (task) => dispatch({ type: "UPDATE_TASK", payload: task });

  const deleteTask = (id) => dispatch({ type: "DELETE_TASK", payload: id });

  const setStatusFilter = (filterValue) =>
    dispatch({ type: "SET_STATUS_FILTER", payload: filterValue });

  const setPriorityFilter = (filterValue) =>
    dispatch({ type: "SET_PRIORITY_FILTER", payload: filterValue });

  // Helper to clear both filters
  const resetFilters = () => {
    dispatch({ type: "SET_STATUS_FILTER", payload: "all" });
    dispatch({ type: "SET_PRIORITY_FILTER", payload: "all" });
  };

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
        updateTask,
        deleteTask,

        setStatusFilter,
        setPriorityFilter,
        resetFilters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// PropTypes validation for TaskProvider component
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
