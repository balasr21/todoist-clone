import React, { useState } from "react";
import { useSelectedProjectValue, useProjectsValue } from "../context/index";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import { firebase } from "../firebase";
import moment from "moment";
import { ProjectOverlay } from "./ProjectOvelay";
import { TaskDate } from "./TaskDate";

export const AddTask = ({
  showAddTaskMain = true, // Add Task Button
  shouldShowMain = false, // Popup option to fill task details
  showQuickAddTask, // Quick Task Button
  setShowQuickAddTask, // Setting Quick Task Button
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const { selectedProject } = useSelectedProjectValue();
  const [showTaskDate, setShowTaskDate] = useState(false);

  const addTask = () => {
    const projectId = project || selectedProject;

    // If the project is Either Today,Tomorrow,Next 7 Days then calculate the dueDate
    // If it doesnt exist use task date selected by the user
    let dueDate;

    if (projectId === "TODAY") {
      dueDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      dueDate = moment().add(7, "days").format("DD/MM/YYYY");
    } else {
      dueDate = taskDate ? taskDate : moment().format("DD/MM/YYYY");
    }

    console.log(" Task : " + task);
    console.log("ProjectId " + projectId);

    task && //If task exists
      projectId && // If Project exists then add the project
      firebase
        .firestore()
        .collection("tasks")
        .add({
          name: task,
          projectId,
          dueDate,
          isArchived: false,
          userId: "123",
          creationDate: moment().format("DD/MM/YYYY"),
        })
        .then(() => {
          console.log(" added task successfuly");
          setTask(""), setTaskDate(""), setShowMain(true);
        }); // Reset Page
  };

  return (
    <div
      className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"}
      data-testid="add-task-comp"
    >
      {/* If Main Task option is to be displayed */}
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setShowMain(!showMain);
          }}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {/* If Popup to add task is enabled either for Main add or quick add */}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {/* If its a quick add task */}
          {showQuickAddTask && (
            <div data-testid="quick-add-task">
              {/* Display Header */}
              <h2 className="header">Quick Add Task</h2>

              {/* Display Cancel */}
              <span
                className="add-task__cancel-x"
                data-testid="add-task-quick-cancel"
                onClick={() => {
                  setShowMain(false),
                    setShowQuickAddTask(false),
                    setShowProjectOverlay(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }
                }}
              >
                X {/* If Cancel X is pressed, reset page */}
              </span>
            </div>
          )}

          {/* Common display elements between Quick add and Add task main */}
          {/* Display Icons */}

          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />

          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />

          {/* Display Input */}
          <input
            className="add-task__content"
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          ></input>

          {/* Display Button to add task */}
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() => {
              // Close the Quick add button if current add task is a Quick add one
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask();
            }}
            onKeyDown={(e) => {
              if (e.key === "enter") {
                // Close the Quick add button if current add task is a Quick add one
                showQuickAddTask
                  ? addTask() && setShowQuickAddTask(false)
                  : addTask();
              }
            }}
          >
            Add Task
          </button>

          {/* If its not quick add task , display a Cancel button */}
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false), setShowProjectOverlay(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "enter") {
                  setShowMain(false), setShowProjectOverlay(false);
                }
              }}
            >
              Cancel
            </span>
          )}

          {/* Common Display of Project Overlay and Schedule */}

          {/* Project Overlay */}

          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => {
              setShowProjectOverlay(!showProjectOverlay);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowProjectOverlay(!showProjectOverlay);
            }}
          >
            <FaRegListAlt />
          </span>

          {/* Task Date - Schedule */}

          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => {
              setShowTaskDate(!showTaskDate);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowTaskDate(!showTaskDate);
            }}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
