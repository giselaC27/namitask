import { createContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleUpdateTasks = (newTasks) => {
    setTasks(newTasks);
  };

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject, tasks, handleUpdateTasks }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
