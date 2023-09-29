import React, { FC, useState, useId} from 'react';
import "./popup.scss"
import { Project } from '../../../types/types';



interface IProps {
  addProjects: (e: Project) => void;
  IdProp:number;
}


  
const Popup: FC<IProps> =({ addProjects, IdProp }) => {
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
      projectId: IdProp,
      title: title,
      description: description,
      tasks: []
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
