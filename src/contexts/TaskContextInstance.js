import { createContext, useContext } from "react";

/**
 * TaskContextInstance defines the context and the useTask hook.
 * TaskContext handles the state and dispatch functions via TaskProvider.
 *
 * This React design pattern is for:
 * 1. Better separation of concerns
 * 2. Easier testing and mocking of context values
 * 3. Cleaner imports for components (useTask hook instead of importing TaskContext directly)
 * 4. Provides a safeguard to ensure the hook is used within a TaskProvider
 * 5. Easier scaling when context logic grows
 */

export const TaskContext = createContext(null);

// Custom hook to access the TaskContext for shared state and dispatch functions
// Also provides a safeguard to ensure the hook is used within a TaskProvider
export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}
