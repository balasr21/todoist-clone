import React, { useEffect } from "react";
import { useTasks } from "../hooks";
import { CheckBox } from "./CheckBox";
import { useSelectedProjectValue, useProjectsValue } from "../context/index";
import { AddTask } from "../components/AddTask";
import { getTitle } from "../helpers/index";

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const userId = "123";
  const { activeTasks } = useTasks({ selectedProject, userId });
  const { projects } = useProjectsValue();

  useEffect(() => {
    document.title = getTitle(projects, selectedProject);
  }, [selectedProject]);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">Projects</h2>
      <ul className="tasks__list">
        {activeTasks &&
          activeTasks.map((task) => (
            <li key={`${task.id}`}>
              {task.name}
              <CheckBox id={task.id} />
            </li>
          ))}
      </ul>

      {/* Show option to add task here */}

      <AddTask showAddTaskMain />
    </div>
  );
};
