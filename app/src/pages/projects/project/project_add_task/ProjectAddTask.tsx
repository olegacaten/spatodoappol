import React, { useState, FC, useEffect } from 'react';
import { Task } from '../../../../types/types';
import './ProjectAddTask.scss';

interface PropsTaskAdd{
  Project_Id_add:number;
  setTasks: (e: Task) => void;
}

const ProjectAddTask: React.FC<PropsTaskAdd> = ({Project_Id_add, setTasks}) => {
  const objectString = localStorage.getItem('ObjectsKey')|| '[]';
  const objectFromLocalStorage = JSON.parse(objectString);
  const [newTask, setNewTask] = useState<Task>({
    taskId: 1,
    title: '',
    description: '',
    creationDate: new Date(),
    timeSpent: 0,
    endDate: '',
    priority: 'Low',
    attachments: [],
    status: 'Open',
    subtasks: [],
    comments: [],
  });

  const [isAddTaskPopupOpen, setAddTaskPopupOpen] = useState(false);

  const handleAddTask = () => {
    const storedProjects = JSON.parse(localStorage.getItem('ObjectsKey') || '[]');
    const projectId = Project_Id_add;
    const projectIndex = storedProjects.findIndex((project: any) => project.projectId === projectId);
    newTask.taskId = 1+Math.floor(Math.random()*10000);

    if (projectIndex !== -1) {
      setTasks(newTask);
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
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value})}
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
              <button type="button" onClick={() => handleAddTask()}>
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
