import React, { FC, useState } from 'react';
import "./popup.scss"
import { Project } from '../../../types/types';

interface IProps {
  addProjects: (e: Project) => void;
}

const Popup: FC<IProps> =({ addProjects }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDescription(e.target.value);
  };

  const handleCreate = () => {
    addProjects({
      projectId: 1,
      title: title,
      tasks: [
        {
          taskId: 1,
          title: "Task 1",
          description: "Task description",
          creationDate: new Date(),
          timeSpent: 0,
          endDate: null,
          priority: "High",
          attachments: [],
          status: "Open",
          subtasks: [],
          comments: [
            {
              commentId: 1,
              text: "This is a comment",
              userId: 2,
              timestamp: new Date(),
              replies: [
                {
                  commentId: 2,
                  text: "Reply to comment 1",
                  userId: 3,
                  timestamp: new Date(),
                  replies: [],
                },
              ],
            },
          ],
        },
      ]
    })

    closePopup();
  };

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add Title and Description</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <button onClick={handleCreate}>Create</button>
            <button onClick={closePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
