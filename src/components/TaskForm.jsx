import styles from "./TaskForm.module.css";

import propTypes from "prop-types";

import { statusOptions, priorityOptions } from "../utils/data.js";

export default function TaskForm({ draft, setDraft, mode }) {
  if (!draft) return null;

  // Determine the appropriate text prefix for accessibility labels based on the mode
  const textPrefix = mode === "create" ? "Add" : "Edit";

  return (
    <>
      <section className={styles.contentBlock}>
        <input
          className={styles.editTitleInput}
          value={draft.title ?? ""}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, title: event.target.value }))
          }
          // Add an aria-label for accessibility to describe the purpose of the input field
          aria-label={`${textPrefix} task title`}
        />

        <section className={styles.descriptionCard}>
          <p className={styles.detailDescLabel}>Description</p>
          <textarea
            className={styles.editDescriptionInput}
            value={draft.description ?? ""}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
            rows={4}
            aria-label={`${textPrefix} task description`}
          />
        </section>
      </section>

      <div className={styles.metaRow}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Priority</span>
          <select
            className={styles.metaSelect}
            value={draft.priority ?? "medium"}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                priority: event.target.value,
              }))
            }
            aria-label={`${textPrefix} task priority`}
          >
            {priorityOptions
              // Filter out the "all" option since it's not a valid priority for a new/edit task
              .filter((option) => option.value !== "all")
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Status</span>
          <select
            className={styles.metaSelect}
            value={draft.status ?? "todo"}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, status: event.target.value }))
            }
            aria-label={`${textPrefix} task status`}
          >
            {statusOptions
              // Filter out the "all" option since it's not a valid status for a new/edit task
              .filter((option) => option.value !== "all")
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
}

TaskForm.propTypes = {
  mode: propTypes.oneOf(["edit", "create"]),
  draft: propTypes.shape({
    title: propTypes.string,
    description: propTypes.string,
    priority: propTypes.oneOf(["low", "medium", "high"]),
    status: propTypes.oneOf(["todo", "in-progress", "done"]),
  }).isRequired,
  setDraft: propTypes.func.isRequired,
};

TaskForm.defaultProps = {
  mode: "edit",
};
