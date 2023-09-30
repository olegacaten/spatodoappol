import React, { useState, FC } from 'react';
import { Task } from '../../../../types/types';
import './ProjectAddTask.scss';

interface PropsTaskAdd{
  Project_Id_add:number;
}
const objectStringcounter = localStorage.getItem('counter');
const objectFromLocalStoragecounter = JSON.parse(objectStringcounter);

let counter = 0; // Initialize the counter outside the function

function incrementCounter() {
  counter++; // Increment the counter by 1
  console.log(`Counter is now ${counter}`);
}



const ProjectAddTask: React.FC<PropsTaskAdd> = (Project_Id_add) => {
  const [newTask, setNewTask] = useState<Task>({
    taskId: counter,
    title: '',
    description: '',
    creationDate: new Date(),
    timeSpent: 0,
    endDate: '', // Initialize as an empty string
    priority: 'Low',
    attachments: [],
    status: 'Open',
    subtasks: [],
    comments: [],
  });

  const [isAddTaskPopupOpen, setAddTaskPopupOpen] = useState(false);

  const handleAddTask = () => {
    incrementCounter() ;
    const storedProjects = JSON.parse(localStorage.getItem('ObjectsKey') || '[]');
    const projectId = Project_Id_add.Project_Id_add;
    const projectIndex = storedProjects.findIndex((project: any) => project.projectId === projectId);

    if (projectIndex !== -1) {
      storedProjects[projectIndex].tasks.push(newTask);
      localStorage.setItem('ObjectsKey', JSON.stringify(storedProjects));
      setAddTaskPopupOpen(false);
    }
  };

  const formatDate = (date: string) => {
    const cleanedDate = date.replace(/\D/g, '');
    const day = cleanedDate.substring(0, 2);
    const month = cleanedDate.substring(2, 4);
    const year = cleanedDate.substring(4, 8);

    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <button onClick={() => setAddTaskPopupOpen(true)}>Add Task</button>

      {isAddTaskPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add New Task</h2>
            <form>
              <input
                type="text"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <div>
                <label htmlFor="endDateInput">End Date:</label>
                <input
                  id="endDateInput"
                  type="text"
                  placeholder="DDMMYYYY"
                  value={newTask.endDate}
                  onChange={(e) => {
                    const formattedDate = formatDate(e.target.value);
                    setNewTask({ ...newTask, endDate: formattedDate });
                  }}
                />
              </div>
              <button type="button" onClick={handleAddTask}>
                Save Task
              </button>
            </form>
            <button onClick={() => setAddTaskPopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAddTask;
