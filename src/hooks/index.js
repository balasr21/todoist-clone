import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { isDefaultProject } from "../helpers/index";
import { defaultProjectKeys, defaultProjects } from "../constants/index";
import moment from "moment";

export const useTasks = ({ selectedProject, userId }) => {
  const [activeTasks, setActiveTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    // baseQuery to fetch all existing tasks based on userId
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", userId);

    // If selected project is a named project
    if (selectedProject && !isDefaultProject(selectedProject)) {
      unsubscribe = unsubscribe.where("projectId", "==", selectedProject);
      // Else if selected project is one of the default
    } else if (selectedProject === defaultProjectKeys.TODAY) {
      unsubscribe = unsubscribe.where(
        "date",
        "==",
        moment().format("DD/MM/YYYY")
      );
    } else if (selectedProject === defaultProjectKeys.TOMORROW) {
      unsubscribe = unsubscribe.where(
        "date",
        "==",
        moment().add(1, "days").format("DD/MM/YYYY")
      );
    } else if (
      selectedProject === defaultProjectKeys.INBOX ||
      selectedProject === 0
    ) {
      unsubscribe = unsubscribe.where("date", "==", "");
    } else {
      // NEXT 7 DAYS - This filter will be applied once after fetching data
      unsubscribe;
    }

    unsubscribe = unsubscribe.get().then((snapshot) => {
      const allTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setActiveTasks(
        selectedProject === defaultProjectKeys.NEXT_7 // If SelectedProject is Next 7 days then filter based on date
          ? allTasks.filter((task) => {
              moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                !task.isArchived;
            })
          : allTasks.filter((task) => !task.isArchived)
      );

      setArchivedTasks(allTasks.filter((task) => task.isArchived));
    });

    // return () => unsubscribe();
  }, [selectedProject]);

  // Main return
  return { activeTasks, archivedTasks };
};

export const useProjects = (userId) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", userId)
      .orderBy("projectId")
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          id: project.id,
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, []);

  return { projects, setProjects };
};
