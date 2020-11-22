import React from "react";
import Sidebar from "../layout/Sidebar.jsx";
import { Tasks } from "../Tasks";

export const Content = () => {
  return (
    <section className="content">
      <Sidebar />;
      <Tasks />
    </section>
  );
};
