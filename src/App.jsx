// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { TaskProvider } from "./contexts/TaskContext.jsx";

import Header from "./components/Header";
import TaskListPage from "./pages/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage";

import "./App.css";

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <div className="app-container">
          {/* Header renders globally across all view routes */}
          <Header />
          <main className="content-view">
            <Routes>
              <Route path="/tasks" element={<TaskListPage />} />
              <Route path="/tasks/:id" element={<TaskDetailPage />} />
              {/* Root catch-all redirects automatically back to tasks overview dashboard */}
              <Route path="*" element={<Navigate to="/tasks" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
