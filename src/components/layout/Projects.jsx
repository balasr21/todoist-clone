import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  useProjectsValue,
  useSelectedProjectValue,
} from "../../context/index.js";
import { IndividualProject } from "../layout/IndividualProject";
import { defaultProjectKeys } from "../../constants/index";

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const [showProjects, setShowProjects] = useState(true);

  return (
    <>
      <div
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? "hidden-projects" : undefined}
          />
        </span>
        <h2 className="project__title">Projects</h2>
      </div>
      <ul className="sidebar__projects">
        {projects &&
          projects
            .filter(
              (project) =>
                defaultProjectKeys.INBOX !== project.projectId &&
                defaultProjectKeys.TODAY !== project.projectId &&
                defaultProjectKeys.TOMORROW !== project.projectId &&
                defaultProjectKeys.NEXT_7 !== project.projectId
            )
            .map((project) => (
              <li
                key={project.projectId}
                data-testid="project-action-parent"
                data-doc-id={project.docId}
                className={
                  active === project.projectId
                    ? "active sidebar__project"
                    : "sidebar__project"
                }
              >
                <div
                  role="button"
                  data-testid="project-action"
                  tabIndex={0}
                  onClick={
                    (() => setActive(project.projectId),
                    () => setSelectedProject(project.projectId))
                  }
                  onKeyDown={
                    (() => setActive(project.projectId),
                    () => setSelectedProject(project.projectId))
                  }
                >
                  <IndividualProject project={project} />
                </div>
              </li>
            ))}
      </ul>
    </>
  );
};
