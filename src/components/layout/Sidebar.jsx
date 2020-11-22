import React, { useState } from "react";
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";
import { Projects } from "./Projects.jsx";
import {
  useSelectedProjectValue,
  useProjectsValue,
} from "../../context/index.js";
import { AddProjects } from "./AddProjects.jsx";

const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("inbox");

  const { projects } = useProjectsValue();

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li>
          <div
            data-testid="inbox"
            className={active === "inbox" ? "active" : "undefined"}
            onClick={() => {
              setActive("inbox");
              setSelectedProject("INBOX");
            }}
            onKeyDown={(e) => {
              if (e.key === "enter") {
                setActive("inbox");
                setSelectedProject("INBOX");
              }
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>

        <li>
          <div
            data-testid="today"
            className={active === "today" ? "active" : "undefined"}
            onClick={() => {
              setActive("today");
              setSelectedProject("TODAY");
            }}
            onKeyDown={(e) => {
              if (e.key === "enter") {
                setActive("today");
                setSelectedProject("TODAY");
              }
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>

        <li>
          <div
            data-testid="next_7"
            className={active === "next_7" ? "active" : "undefined"}
            onClick={() => {
              setActive("next_7");
              setSelectedProject("next_7");
            }}
            onKeyDown={(e) => {
              if (e.key === "enter") {
                setActive("next_7");
                setSelectedProject("next_7");
              }
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 Days</span>
          </div>
        </li>
      </ul>

      <Projects />
      <AddProjects />
    </div>
  );
};

export default Sidebar;
