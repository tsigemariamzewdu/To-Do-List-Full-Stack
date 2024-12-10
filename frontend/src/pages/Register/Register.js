import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from "../../utlis/axios";
import register from "./register.module.css"

function Register() {
  const [name,setName]=useState("");
  const[email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  async function handleRegistration(e){
    e.preventDefault();
    try{
      const response=await axios.post("/user/register",{name,email,password});
      alert("registration successfull");
      navigate("/login")
      

    }catch(error){
      console.error("error registering user:",error)
    }


  }
  return (
    <div className={register.container}>
      <p className={register.p}>Register here !</p>
       <p className={register.somenote}>already have account? <Link to="/login" className={register.thelink}>login </Link></p>
    <form onSubmit={handleRegistration}>
      <div className={register.inputs}>
      <label htmlFor="text">name</label>
      <input type="text"  id="name"value={name} onChange={(e)=>setName(e.target.value)} />
      </div>
      <div className={register.inputs}>
      <label htmlFor="email">Email</label>
      <input  type="email" id="name" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      </div>
      <div className={register.inputs}>
      <label htmlFor="password">password</label>
      <input type="password" id="password" value={password}  onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <button  className={register.register} type='submit'>register</button>
    </form>
    
    
    
    
    
    
    
    
    
    
    </div>
    
  )
}

export default Register