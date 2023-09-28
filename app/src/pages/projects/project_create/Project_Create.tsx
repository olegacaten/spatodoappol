import React, { useState } from 'react';
import "./popup.scss"
function Popup() {
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
    // Perform the creation logic here, e.g., send data to a server or update state
    console.log('Title:', title);
    console.log('Description:', description);

    // Close the popup
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
