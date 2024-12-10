import React, { useState, useEffect } from 'react';
import axios from "../../utlis/axios";
import  classified from './classifed.module.css'

function Classified() {
    const token = localStorage.getItem("token");
    const [completedTasks, setCompletedTasks] = useState([]);
    const [uncompletedTasks, setUncompletedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const [completedResponse, uncompletedResponse] = await Promise.all([
                    axios.get("/todos/completed", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }),
                    axios.get("/todos/uncompleted", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                ]);

                setCompletedTasks(completedResponse.data);
                setUncompletedTasks(uncompletedResponse.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [token]);

    if (isLoading) {
        return <p className="loading-message">Loading tasks...</p>;
    }

    if (completedTasks.length === 0 && uncompletedTasks.length === 0) {
        return <p className="no-tasks-message">No tasks available</p>;
    }

    return (
        <div className={classified.classifiedcontainer}>
            <div className="tasks-section completed-tasks">
                <h3 className={classified.sectiontitle}>Completed Tasks</h3>
                {completedTasks.length > 0 ? (
                    <ul className={classified.taskslist}>
                        {completedTasks.map((task) => (
                            <li className={classified.taskitem} key={task._id}>
                                {task.task}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={classified.notasks}>No tasks completed</p>
                )}
            </div>

            <div className="tasks-section uncompleted-tasks">
                <h3 className={classified.sectiontitle}>Uncompleted Tasks</h3>
                {uncompletedTasks.length > 0 ? (
                    <ul className={classified.taskslist}>
                        {uncompletedTasks.map((task) => (
                            <li className={classified.taskitem} key={task._id}>
                                {task.task}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={classified.notasks}>All tasks are completed</p>
                )}
            </div>
        </div>
    );
}

export default Classified;
