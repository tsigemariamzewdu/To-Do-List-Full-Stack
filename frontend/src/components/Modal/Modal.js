import React from 'react';
import modal from "./modal.module.css";

function Modal({ isOpen, onClose, onSave }) {
    const [task, setTask] = React.useState("");

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const handleSave = () => {
        onSave(task); // this one saves the task
        setTask(""); // this one clears the input field
    };

    if (!isOpen) return null;

    return (
        <div className={modal.modalContainer}>
            <h2 className={modal.modalTitle}>Add a new task</h2>
            <input 
                type="text" 
                value={task} 
                onChange={handleChange} 
                placeholder="Enter task" 
                className={modal.modalInput}
            />
            <button onClick={handleSave} className={`${modal.modalButton} ${modal.modalButtonSave}`}>Save</button>
            <button onClick={onClose} className={`${modal.modalButton} ${modal.modalButtonCancel}`}>Cancel</button>
        </div>
    );
}

export default Modal;
