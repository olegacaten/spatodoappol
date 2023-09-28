import Popup from "./project_create/Project_Create"
import { useId, useState } from 'react'
import { Project } from "../../types/types";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  let id = useId();

  return (
    <div className="projects-container">
      <Popup addProjects={(e: Project) => setProjects(prev => [...prev, e])}/>

      <div className="project-list">
        <ul>
          {
            projects.map((item, index) => (
              <li key={id+index}>
                <p>{item.title}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
 );
}

export default Projects;