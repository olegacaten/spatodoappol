import Popup from "./project_create/Project_Create"

 function Projects() {
  return (
    <div className="projects-container">
      <Popup/>

      <div className="project-list">
        {/* Display your projects here */}
        <div className="project">Project 1</div>
        <div className="project">Project 2</div>
        {/* Add more project components */}
      </div>
    </div>
 );
}

export default Projects;