import React, { useEffect, useState } from 'react'
import home from "./home.module.css"
import SingleList from '../../components/singlelist/SingleList'
import axios from '../../utlis/axios'
import {useNavigate} from "react-router-dom";
import Modal from "../../components/Modal/Modal"

function Home() {
    

    const [tasks,setTasks]=useState([])
    const [userName,setUserName]=useState("");
    const [isModalOpen,setIsModalOpen]=useState(false)
    const navigate=useNavigate();
    async function handleAddTodo(){
        setIsModalOpen(true)
    };
    //function to save the new task
    const handleSaveTask=async (task)=>{
        try{
            const token=localStorage.getItem("token")
            const response=await axios.post("/todos/add",{task},{headers:{
                Authorization:`Bearer ${token}`
            }})
            setTasks([...tasks,response.data]);
            setIsModalOpen(false)
        }catch(error){
            console.error("error saving task:",error)
        }
    }

    useEffect(()=>{
        const fetchTasks= async()=>{
            try {
                const token=localStorage.getItem("token")
                const response=await axios.get("/todos/viewall",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                console.log(response)
                setTasks(response.data);
                if(response.data.length>0){
                
                setUserName(response.data[0].user.name);
                }
                
            } catch (error) {
                console.error("error fetching task:",error)
                // if (error.response && error.response.status === 401) {
                //     // If unauthorized, navigate to login
                //     localStorage.removeItem("token");
                //     navigate("/login");
                //   }
            }
        }; fetchTasks();
    },[navigate]);
  return (
    <div className={home.container}>
        <div className={home.title}>
        <h2>what is up,{userName || "you"}!</h2></div>

        <div className={home.taskslist}>
            <h2>today's task</h2>
            {tasks.map((task)=>{
                return <SingleList key={task._id} task={task} setTasks={setTasks}  />
            })}
            
        </div>
        <div>
            <button className={home.status} onClick={()=> navigate('/classified-tasks')}>status</button>
            <button  className={home.logout}onClick={()=>navigate('/login')}>logout</button>
            <button className={home.plus} onClick={handleAddTodo}> +</button>
        </div>
        {/* modal for adding new task */}
        <Modal isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        onSave={handleSaveTask}/>
       
    </div>
  )
}

export default Home