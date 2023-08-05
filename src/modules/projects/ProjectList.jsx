import { useContext } from 'react';
import ProjectContext from './ProjectContext'; // Importamos el ProjectContext

const ProjectList = ({ projects }) => {
  const { selectedProject, setSelectedProject, } = useContext(ProjectContext); // Obtenemos setSelectedProject desde el contexto

  return (
    <ul>
       {projects.map((project) => (
            <div
              key={project.id}
              className={`cursor-pointer mb-2 ${
                selectedProject === project ? 'text-blue-500 font-bold' : 'text-gray-700'
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {project.name}
            </div>
          ))}
          
    </ul>
  );
};

export default ProjectList;
