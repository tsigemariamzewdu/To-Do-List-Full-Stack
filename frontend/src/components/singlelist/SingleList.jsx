import React from 'react';
import singlelist from "./singlelist.module.css";
import axios from '../../utlis/axios';

function SingleList({ task, setTasks }) {
    const token=localStorage.getItem("token")
    // Mark the task as completed
    async function handlecompleted() {
        try {
            const updatedEntry = await axios.patch(
                `/todos/${task._id}/complete`,
                { completed: true }, // Send completed status in body
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Updated task from backend:", updatedEntry.data);
            alert("Congrats! Task completed");
    
            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                    t._id === task._id ? { ...t, completed: true } : t
                )
            );
        } catch (error) {
            console.error("Error marking task as completed", error.response?.data || error.message);
        }
    }
    
    
    // Delete the task
    async function handledelte() {
        try {
        await axios.delete(`todos/${task._id}/delete`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

            // Remove the task from the state
            setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
        } catch (error) {
            console.error("Error deleting task", error);
        }
    }

    return (
        <div className={singlelist.container}>
            <div className={singlelist.singleitem}>
                <div className={singlelist.thetask}>
                <p>{task.task}</p></div>
                {/* Mark the task as completed */}
                <div className={singlelist.buttons}>
                <button className={singlelist.containerbuttoncheck} onClick={handlecompleted}> ✅ </button>
                {/* Delete the task */}
                <button className={singlelist.containerbuttondel} onClick={handledelte}> x</button>
                </div> </div>
        </div>
    );
}

export default SingleList;
