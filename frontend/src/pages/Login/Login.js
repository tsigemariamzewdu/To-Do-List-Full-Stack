import React, { useState } from 'react';
import axios from '../../utlis/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import login from "./login.module.css"

function Login() {
    const navigate=useNavigate()
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    async function handleLogin(e){
        e.preventDefault();

        try{
            const response =await axios.post("/user/login",{email,password});
            
           
        
        
        localStorage.setItem("token",response.data.token);
        alert("login successful")
        navigate("/home")

    }
    catch(error){
        console.error("error during login:",error)
        alert("invalid email or password")
    }}
  return (
    <div className={login.container}>
        <p className={login.p}>login</p>
        <p className={login.somenote}>not registered yet?  <Link to='/register' className={login.thelink}>create account</Link></p>
        <form onSubmit={handleLogin}>
            <div className={login.inputs}>
        <label htmlFor="email">email</label>
        <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        
      <div className={login.inputs}>
        <label htmlFor="password">password</label>
        <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        
        <button className={login.sumbit} type='submit'>login</button>
        </form>
    </div>
  )
}

export default Login;