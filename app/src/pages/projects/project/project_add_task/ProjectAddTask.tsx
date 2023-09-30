import React, { useState, FC} from 'react';
import { Task } from '../../../../types/types';
import "./ProjectAddTask.scss"

const ProjectAddTask: React.FC = () => {
  const [newTask, setTask] = useState<Task>({
    taskId: 0,
    title: '',
    description: '',
    creationDate: new Date(),
    timeSpent: 0,
    endDate: null,
    priority: 'Low',
    attachments: [],
    status: 'Open',
    subtasks: [],
    comments: [],
  });

  return (
    <div>

    </div>
  );
};

export default ProjectAddTask;
