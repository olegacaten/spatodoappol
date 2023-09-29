import Popup from "./project_create/Project_Create"
import { useId, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Project } from "../../types/types";
import "./projects.scss"
function Projects() {

  let highestId:number;
  const objectString = localStorage.getItem('ObjectsKey')|| '[]';
  const objectFromLocalStorage = JSON.parse(objectString);

  const [projects, setProjects] = useState<Project[]>(objectFromLocalStorage)
  let id = useId();
  

  useEffect(() => {
    const objectString = JSON.stringify(projects);
    localStorage.setItem('ObjectsKey', objectString);
  }, [projects]);


  
  
  return (
    <div className="projects-container">
      <Popup addProjects={(e: Project) => setProjects(prev => [...prev, e])} />

      <div className="project-list">
        <ul>
          {
            projects.map((item, index) => (
              <li key={id+index}>
                  <Link to={`/project/${item.projectId}`}>id:{item.projectId}title:{item.title} des:{item.description}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
 );
}

export default Projects;