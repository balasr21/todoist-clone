import "./App.css";
import Header from "./components/layout/Header";
import { Content } from "./components/layout/Content";
import React, { useState } from "react";
import { Tasks } from "./components/Tasks";
import {
  ProjectsProvider,
  SelectedProjectProvider,
} from "../src/context/index";

function App({ darkModeDefault = true }) {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main
          data-testid="application"
          className={darkMode ? "darkmode" : undefined}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
}

export default App;
