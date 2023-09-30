import React, { FC, useState, useId} from 'react';
import "./popup.scss"
import { Project } from '../../../types/types';



interface IProps {
  addProjects: (e: Project) => void;
}


  
const Popup: FC<IProps> =({ addProjects }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const objectString = localStorage.getItem('ObjectsKey')|| '[]';
  const objectFromLocalStorage = JSON.parse(objectString);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: { target: { value: React.SetStateAction<string>;   }; }) => {
    setDescription(e.target.value);
  };

  const handleCreate = () => {
    addProjects({
      projectId: objectFromLocalStorage.at(-1) ? objectFromLocalStorage.at(-1).projectId+1 : 0,
      title: title,
      description: description,
      tasks: [
        {
          taskId: 2,
          title: 'title task',
          description: 'description task',
          creationDate: new Date(),
          timeSpent: 4,
          endDate: '',
          priority: 'Low',
          attachments: [''],
          status: 'queue',
          comments: []
        },
        {
          taskId: 3,
          title: 'title task',
          description: 'description task',
          creationDate: new Date(),
          timeSpent: 4,
          endDate: null,
          priority: 'Low',
          attachments: [''],
          status: 'queue',
          comments: []
        },
      ]
    })


    closePopup();
  };

  return (
    <div className='projectcreate'>
      <div className="btn_create" >
      <button onClick={openPopup}>Create New Project</button>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create new project</h2>
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
