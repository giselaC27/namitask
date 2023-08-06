import { useContext } from "react";
import ProjectContext from "./ProjectContext";

const ProjectList = ({ projects, onSelect }) => {
  const { selectedProject } = useContext(ProjectContext); // Obtenemos el proyecto seleccionado desde el contexto

  return (
    <ul>
      {projects.map((project) => (
        <div
          key={project.id}
          className={`cursor-pointer mb-2 ${
            selectedProject === project
              ? "text-blue-500 font-bold"
              : "text-gray-700"
          }`}
          onClick={() => {
            onSelect(project); // Llama a la función onSelect con el proyecto seleccionado
          }}
        >
          {project.name}
        </div>
      ))}
    </ul>
  );
};

export default ProjectList;
