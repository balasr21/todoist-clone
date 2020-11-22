import React, { useState } from "react";
import { firebase } from "../../firebase";
import { useProjectsValue, useSelectedProjectValue } from "../../context/index";
import { FaTrashAlt } from "react-icons/fa";

export const IndividualProject = ({ project }) => {
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteProject = (docId) =>
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects(...projects);
        setSelectedProject("INBOX");
      });

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>

      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p> Are you sure you want to delete ?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.id)}
                onKeyDown={(e) => {
                  if (e.key === "enter") {
                    () => deleteProject(project.id);
                  }
                }}
              >
                Delete
              </button>
              <span
                onKeyDown={(e) => {
                  if (e.key === "Enter") setShowConfirm(!showConfirm);
                }}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
