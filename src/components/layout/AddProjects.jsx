import React, { useState } from "react";
import { useProjectsValue } from "../../context/index";
import { firebase } from "../../firebase";
import { generatePushId } from "../../helpers/index";
import * as firebaseCol from "firebase/app";

export const AddProjects = () => {
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState("");
  const { projects, setProjects } = useProjectsValue();

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection("projects")
        .add({
          projectId: generatePushId(),
          name: name,
          userId: "123",
          creationDate: new Date(),
        })
        .then(() => {
          setProjects([...projects]);
          setProjectName(projectName);
          setShow(false);
        });
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project" data-testid="add-project">
          <input
            value={projectName}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
            onChange={(e) => setProjectName(e.target.value)}
          />

          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject(projectName)}
          >
            Add Project
          </button>
          <span
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShow(!show);
        }}
      >
        Add Project
      </span>
    </div>
  );
};
