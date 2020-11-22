import React, { useState } from "react";
import { CgDarkMode } from "react-icons/cg";
import { FcTodoList } from "react-icons/fc";
import { AddTask } from "../AddTask";

const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <FcTodoList />
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
                aria-label="Quick add task"
                type="button"
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
              >
                +
              </button>
            </li>
            <li className="settings__darkmode">
              <CgDarkMode
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
              />
            </li>
            <li>
              <AddTask
                showAddTaskMain={false}
                shouldShowMain={shouldShowMain}
                showQuickAddTask={showQuickAddTask}
                setShowQuickAddTask={setShowQuickAddTask}
              />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
