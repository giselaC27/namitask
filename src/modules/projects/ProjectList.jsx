import  { useContext } from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa"; // Importa los iconos
import ProjectContext from "./ProjectContext";

const ProjectList = ({ projects, onSelect, onDelete }) => { // onDelete a las props
  const { selectedProject } = useContext(ProjectContext);

  return (
    <ul>
      {projects.map((project) => (
        <div
          key={project.id}
          className={`cursor-pointer mb-2 ${
            selectedProject && selectedProject.id === project.id
              ? "text-blue-500 font-bold"
              : "text-gray-700"
          }`}
          onClick={() => {
            onSelect(project); // Llama a la función onSelect con el proyecto seleccionado
          }}
        >
          <div className="flex items-center">
            <span>{project.name}</span>
            <span className="ml-2 text-red-500">
              <FaTrash onClick={() => onDelete(project.id)} /> {/* Agrega el icono de eliminación con evento onClick */}
            </span>
          </div>

          <div className="border p-2 rounded bg-gray-100 text-xm text-gray-600">
            Código de Proyecto: {project.codeInvitation}
          </div>
        </div>
      ))}
    </ul>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,

};

export default ProjectList;
