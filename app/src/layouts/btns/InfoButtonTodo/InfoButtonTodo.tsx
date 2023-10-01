import React, { useState, useEffect } from 'react';
import { Task } from "../../../types/types";
import './InfoButtonTodo.scss';

type InfoButtonProps = {
  task: Task;
  stateofopentodo: (data: boolean) => void;
};

const InfoButtonTodo: React.FC<InfoButtonProps> = ({ task, stateofopentodo }) => {
   
  const [isPopupOpenInfoTodo, setPopupOpenInfoTodo] = useState(false);
  const [timeSpent, setTimeSpent] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(() => {
    return task.creationDate ? new Date(task.creationDate) : null;
  });



  const openPopupInfoTodo = () => {
    setPopupOpenInfoTodo(true);
    stateofopentodo(isPopupOpenInfoTodo);
    setStartTime(new Date(task.creationDate));
  };

  const closePopupInfoTodo = () => {
    setPopupOpenInfoTodo(false);
    stateofopentodo(isPopupOpenInfoTodo);
  };

  const formatTimeDifference = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours > 0) {
      return `${hours} hours and ${remainingMinutes} minutes`;
    } else {
      return `${remainingMinutes} minutes`;
    }
  };
  
  


  useEffect(() => {
    if (isPopupOpenInfoTodo && startTime !== null) {
      console.log(` {startTime } :: ${startTime}`);
      const currentTime = new Date();
      const timeDifferenceMs = currentTime.getTime() - startTime.getTime();
      console.log(`time differense :: ${timeDifferenceMs}`);
      const timeDifferenceMinutes = Math.floor(timeDifferenceMs / (1000 * 60));

      // Set time spent in state
      setTimeSpent(formatTimeDifference(timeDifferenceMinutes));
    } else {
      // Popup is closed, reset time spent and start time
      setTimeSpent(null);
      setStartTime(null);
    }
  }, [isPopupOpenInfoTodo, startTime, task.creationDate]); // Add task.creationDate as a dependency


  return (
    <div className="info-button-container">
      <button className="info-button" onClick={openPopupInfoTodo}>
        <span className="info-icon">i</span>
      </button>
      {isPopupOpenInfoTodo && (
        <div className="popup">
          <div className="popup-content">
            <h2><strong>Task Information</strong></h2>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description: </strong>{task.description}</p>
            <p><strong>Time Spent:</strong>  {timeSpent}</p>
    <p><strong>End Date:</strong> {task.endDate}</p>
    <p><strong>Priority:</strong> {task.priority}</p>
    <p><strong>Attachments:</strong> {task.attachments.join(', ')}</p>
    <p><strong>Status:</strong> {task.status}</p>


            <button onClick={closePopupInfoTodo}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoButtonTodo;
