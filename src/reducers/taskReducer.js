import { STORAGE_KEY, initialTasks } from "../utils/data";

// Load initial tasks from localStorage if available, otherwise use the default initialTasks
function loadInitialTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
  }
  return initialTasks;
}

export const initialTaskState = {
  tasks: loadInitialTasks(),
  statusFilter: "all",
  priorityFilter: "all",
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "SET_STATUS_FILTER":
      return {
        ...state,
        statusFilter: action.payload,
      };
    case "SET_PRIORITY_FILTER":
      return {
        ...state,
        priorityFilter: action.payload,
      };
    default:
      return state;
  }
}
